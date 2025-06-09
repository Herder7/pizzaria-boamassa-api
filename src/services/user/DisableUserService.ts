import prismaClient from "../../prisma";
import { UpdateUserService } from "./UpdateUserService";

interface UserRequest {
    user_id: string;
    disable: boolean;
    user_id_body: string;
}

class DisableUserService {
    async execute({ user_id, disable, user_id_body }: UserRequest) {

        const userPerfil = await prismaClient.user.findFirst({
            where: {
                id: user_id_body
            }
        });

        if (userPerfil.perfil !== 'ADM') {
            throw new Error('Você não tem o perfil de administrador para realizar esta ação!');
        }

        if (user_id === user_id_body) {
            throw new Error('Você não pode desabilitar seu próprio usuário!');
        }

        const userBase = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (userBase.is_logged) {
            throw new Error('O usuário está logado!');
        }

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                status: !disable,
                updated_at: new Date()
            }
        });

        return user;
    }
}

export { DisableUserService }