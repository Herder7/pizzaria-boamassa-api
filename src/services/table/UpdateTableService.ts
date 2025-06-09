import prismaClient from "../../prisma";

interface CategoryRequest {
    table_id: string;
    type: string;
    disable: boolean;
}

class UpdateTableService {
    async execute({ table_id, type, disable }: CategoryRequest) {

        if (type === 'call_waiter') {
            const table = await prismaClient.table.update({
                where: {
                    id: table_id
                },
                data: {
                    call_waiter: !disable
                }
            });
            return table;
        } else {
            const table = await prismaClient.table.update({
                where: {
                    id: table_id
                },
                data: {
                    close_bill: !disable
                }
            });
            return table;
        }

    }
}

export { UpdateTableService }