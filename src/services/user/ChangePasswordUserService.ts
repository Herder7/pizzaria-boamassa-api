import { compare, hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    old_password: string;
    new_password: string;
}

class ChangePasswordUserService {
    async execute({ user_id, old_password, new_password }: UserRequest) {

        const userValidate = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (!await compare(old_password, userValidate.password)) {
            throw new Error('Senha antiga incorreta!');
        }

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                password: await hash(new_password, 8)
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                status: true
            }
        });

        return user;
    }
}

export { ChangePasswordUserService }