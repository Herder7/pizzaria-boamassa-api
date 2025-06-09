import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { validate } from "email-validator";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    perfil: string;
}

class CreateUserService {
    async execute({ name, email, password, perfil }: UserRequest) {

        //const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        //console.log(emailRegexp.test(email));

        //Verificar o nome
        if (!name) {
            throw new Error("Nome obrigatório!");
        }

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
        if (password.length <= 5) {
            throw new Error("A senha tem que ter no mínimo 6 caracteres!");
        }

        //Verificar se o e-mail já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (userAlreadyExists) {
            throw new Error("Já existe um usuário cadastrado com este e-mail!");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                perfil: perfil
            },
            select: {
                id: true,
                name: true,
                email: true,
                perfil: true
            }
        })

        return user;
    }
}

export { CreateUserService }