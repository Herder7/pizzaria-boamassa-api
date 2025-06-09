import prismaClient from "../../prisma";

interface TableRequest {
    number: string;
    user_id: string;
}

class CreateTableService {
    async execute({ number, user_id }: TableRequest) {

        const numberInt = parseInt(number);

        const lastTable = await prismaClient.table.findFirst({
            orderBy: {
                created_at: 'desc'
            }
        });

        let numberTable = 0;

        if (lastTable) {
            numberTable = parseInt(lastTable.number);
        }

        for (let x = 1; x <= numberInt; x++) {
            await prismaClient.table.create({
                data: {
                    number: (numberTable + x).toString(),
                    user_id: user_id
                }
            });
        }
        return "OK: Mesas criadas!";
    }
}

export { CreateTableService }