import prismaClient from "../../prisma";

class LoggedOutUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                is_logged: false
            }
        });

        return user;
    }
}

export { LoggedOutUserService }