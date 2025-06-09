import prismaClient from "../../prisma";

interface PaymentRequest {
    table_id: string;
    user_id: string;
}

interface ItemProps {
    id: string;
    amount: number;
    name: string;
    price: string;
}

class CreatePaymentService {
    async execute({ table_id, user_id }: PaymentRequest) {

        const orders = await prismaClient.order.findMany({
            where: {
                table_id: table_id,
                paid_draft: ''
            }
        });

        const orders_id = <string[]>[];

        orders.forEach((item) => {
            orders_id.push(item.id);
        })

        const items = await prismaClient.item.groupBy({
            by: ['product_id'],
            _sum: {
                amount: true
            },
            where: {
                order_id: {
                    in: orders_id
                }
            }
        });

        for (let x = 0; x < orders_id.length; x++) {
            await prismaClient.order.update({
                where: {
                    id: orders_id[x]
                },
                data: {
                    paid_draft: "Y"
                }
            });
        }

        const itemsCloseBill = <ItemProps[]>[];
        let totalBill = 0;

        for (let x = 0; x < items.length; x++) {
            const product = await prismaClient.product.findFirst({
                where: {
                    id: items[x].product_id
                }
            });

            const itemAdd: ItemProps = {
                id: items[x].product_id,
                amount: items[x]._sum.amount,
                name: product.name,
                price: product.price
            }

            itemsCloseBill.push(itemAdd);
            totalBill = totalBill + (items[x]._sum.amount * Number(product.price));
        }

        const payment = await prismaClient.payment.create({
            data: {
                table_id: table_id,
                total_amount: totalBill.toString(),
                user_id: user_id
            }, 
            select: {
                id: true
            }
        });

        return { itemsCloseBill, totalBill, payment };
    }
}

export { CreatePaymentService }