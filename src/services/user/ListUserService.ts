import prismaClient from "../../prisma";

class ListUserService {
    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (user.perfil !== 'ADM') {
            throw new Error('Você não tem o perfil de administrador para realizar esta ação!');
        }

        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                status: true,
                is_logged: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return users;
    }
}

export { ListUserService }