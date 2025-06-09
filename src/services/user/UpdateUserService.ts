import { validate } from "email-validator";
import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    name: string;
    email: string;
}

class UpdateUserService {
    async execute({ user_id, name, email }: UserRequest) {

        const userUpdate: UserRequest = {
            user_id: user_id,
            name: name,
            email: email,
        }

        const userBase = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                perfil: true
            }
        });

        if (!validate(email)) {
            throw new Error("E-mail inválido!");
        }

        if(JSON.stringify(userUpdate) === JSON.stringify(userBase)) {
            return "Nada para atualizar!";
        } else {
            const user = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    name: name,
                    email: email,
                    updated_at: new Date()
                }
            });
            return user;
        }
    }
}

export { UpdateUserService }