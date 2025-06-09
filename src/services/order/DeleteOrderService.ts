import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id }: OrderRequest) {

        const verifyOrder = await prismaClient.item.findFirst({
            where: {
                order_id: order_id
            }
        });

        if (verifyOrder) {
            throw new Error('Pedido não existe!');
        }

        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        });

        return order;
    }
}

export { DeleteOrderService }