import prismaClient from "../../prisma";

interface MenuRequest {
    table_id: string;
    close_bill: boolean;
}

class CloseBillMenuService {
    async execute({ table_id, close_bill }: MenuRequest) {

        if (!close_bill) {
            const orderHasPaidDraft = await prismaClient.item.findFirst({
                where: {
                    order: {
                        table_id: table_id,
                        paid_draft: 'Y',
                        paid: false
                    }
                }
            });

            if (orderHasPaidDraft) {
                throw new Error('O garçom já gerou uma parcial, espere ele encerrar ou liberar a conta!');
            }
        }

        const orderIsOpen = await prismaClient.item.findFirst({
            where: {
                order: {
                    table_id: table_id,
                    paid_draft: '',
                    paid: false
                }
            }
        });

        if (!orderIsOpen) {
            throw new Error('A mesa não possui pedidos abertos!');
        }

        const table = await prismaClient.table.update({
            where: {
                id: table_id
            },
            data: {
                close_bill: close_bill
            }
        })

        return table;
    }
}

export { CloseBillMenuService }