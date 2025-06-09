import prismaClient from "../../prisma";

class ListTableCloseBillService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            where: {
                OR: [
                    {
                        close_bill: true
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

export { ListTableCloseBillService }