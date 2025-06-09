import prismaClient from "../../prisma";

interface MenuRequest {
    table_id: string;
    call_waiter: boolean;
}

class CallWaiterMenuService {
    async execute({ table_id, call_waiter }: MenuRequest) {

        const table = await prismaClient.table.update({
            where: {
                id: table_id
            },
            data: {
                call_waiter: call_waiter
            }
        })

        return table;
    }
}

export { CallWaiterMenuService }