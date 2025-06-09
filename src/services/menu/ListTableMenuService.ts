import prismaClient from "../../prisma";

interface MenuRequest {
    table: string;
}

class ListTableMenuService {
    async execute({ table }: MenuRequest) {

        const getTable = await prismaClient.table.findFirst({
            where: {
                number: table,
            },
            select: {
                id: true,
                number: true,
                call_waiter: true,
                close_bill: true
            }
        })

        return getTable;
    }
}

export { ListTableMenuService }