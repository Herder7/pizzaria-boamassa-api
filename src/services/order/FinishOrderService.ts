import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
    user_id: string;
}

class FinishOrderService {
    async execute({ order_id, user_id }: OrderRequest) {

        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true,
                user_id: user_id,
                updated_at: new Date()
            }
        })

        return order;

    }
}

export { FinishOrderService }