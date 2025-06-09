import prismaClient from "../../prisma";

class ListTableCallWaiterService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            where: {
                OR: [
                    {
                        call_waiter: true
                    }

                ]
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return tables;
    }
}

export { ListTableCallWaiterService }