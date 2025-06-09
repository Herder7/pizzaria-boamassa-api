import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
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

        if (!user) {
            throw new Error("Usuário não cadastrado!");
        }

        return user;
    }
}

export { DetailUserService }