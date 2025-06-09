import prismaClient from "../../prisma";

interface PaymentRequest {
    payment_id: string; 
    debit: string; 
    credit: string; 
    pix: string; 
    money: string;
    user_id: string;
}

class FinishPaymentService {
    async execute({ payment_id, debit, credit, pix, money, user_id }: PaymentRequest) {

        const payment = await prismaClient.payment.update({
            where: {
                id: payment_id
            },
            data: {
                amount_paid: (Number(debit) + Number(credit) + Number(pix) + Number(money)).toString(),
                amount_debit: debit,
                amount_credit: credit,
                amount_pix: pix,
                amount_money: money,
                user_id: user_id
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
                free: true,
                close_bill: false
            }
        });

        const order = await prismaClient.order.updateMany({
            where: {
                table_id: payment.table_id,
                paid_draft: 'Y'
            },
            data: {
                paid: true
            }
        })
        
        return "OK: Pagamento realizado!";
    }
}

export { FinishPaymentService }