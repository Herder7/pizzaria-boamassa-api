import prismaClient from "../../prisma";

interface PaymentRequest {
    payment_id: string;
}

class DeletePaymentService {
    async execute({ payment_id }: PaymentRequest) {

        const paymentBase = await prismaClient.payment.findFirst({
            where: {
                id: payment_id
            }
        });

        const order = await prismaClient.order.updateMany({
            where: {
                table_id: paymentBase.table_id,
                paid: false
            },
            data: {
                paid_draft: '',
            }
        });

        const payment = await prismaClient.payment.delete({
            where: {
                id: paymentBase.id
            }, 
            select: {
                table_id: true
            }
        });

        const table = await prismaClient.table.update({
            where: {
                id: payment.table_id
            },
            data: {
                close_bill: false
            }
        })

        return "OK: Pagamento Deletado!";
    }
}

export { DeletePaymentService }