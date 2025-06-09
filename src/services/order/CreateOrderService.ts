import prismaClient from "../../prisma";

interface OrderRequest {
    table_id: string;
    name: string;
    user_id: string;
}

class CreateOrderService {
    async execute({ table_id, name, user_id }: OrderRequest) {

        const order = await prismaClient.order.create({
            data: {
                table_id: table_id,
                name: name,
                user_id: user_id
            }
        });

        return order;
    }
}

export { CreateOrderService }