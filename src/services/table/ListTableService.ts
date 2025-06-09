import prismaClient from "../../prisma";

class ListTableService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            orderBy: {
                created_at: 'asc'
            }
        });

        return tables;
    }
}

export { ListTableService }