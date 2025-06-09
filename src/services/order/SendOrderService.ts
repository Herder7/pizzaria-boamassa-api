import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest) {
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false
            }
        });

        const table = await prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                table_id: true
            }
        });

        await prismaClient.table.update({
            where: {
                id: table.table_id
            },
            data: {
                free: false
            }
        });

        return order;

    }
}

export { SendOrderService }