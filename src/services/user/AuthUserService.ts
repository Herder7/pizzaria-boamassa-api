import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { validate } from "email-validator";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        //Verificar o e-mail
        if (!email) {
            throw new Error("E-mail obrigatório!");
        }
        if (!validate(email)) {
            throw new Error("E-mail inválido!");
        }

        //Verificar o password
        if (!password) {
            throw new Error("Senha obrigatória!");
        }

        // Verificar se o e-mail existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado!");
        }

        //Verificar se a senha está incorreta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha incorreta!");
        }

        if (!user.status) {
            throw new Error('Usuário desabilitado!');
        }

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                is_logged: true
            }
        });

        //Se deu tudo certo, vamos gerar o token pro usuário
        const token = sign(
            {
                nane: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            perfil: user.perfil,
            token: token
        };
    }
}

export { AuthUserService }