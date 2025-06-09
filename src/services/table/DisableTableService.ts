import prismaClient from "../../prisma";

interface CategoryRequest {
    table_id: string;
    disable: boolean;
}

class DisableTableService {
    async execute({ table_id, disable }: CategoryRequest) {

        const tableExist = await prismaClient.table.findFirst({
            where: {
                id: table_id
            }
        });

        if (!tableExist) {
            throw new Error("Mesa não cadastrada!");
        }
        
        if(!tableExist.free) {
            throw new Error("Mesa ocupada, não pode ser desabilitada!");
        }

        const table = await prismaClient.table.update({
            where: {
                id: table_id
            },
            data: {
                status: !disable
            }
        });

        return table;
    }
}

export { DisableTableService }