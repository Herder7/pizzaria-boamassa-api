import prismaClient from "../../prisma";
import moment = require("moment");

interface PaymentRequest {
    type_payment: string;
    table_id: string;
    user_id: string;
    date_from: string;
    date_to: string;
}
class ListPaymentsService {
    async execute({ type_payment, table_id, user_id, date_from, date_to }: PaymentRequest) {

        date_to = moment(
            date_to, "YYYY-MM-DD"
        ).add(
            23, 'hours'
        ).add(
            59, 'minutes'
        ).add(
            59, 'seconds'
        ).format('YYYY-MM-DD HH:mm:ss');

        if (type_payment === undefined) {
            const payments = await prismaClient.payment.findMany({
                where: {
                    table_id: table_id,
                    user_id: user_id,
                    created_at: {
                        gte: new Date(date_from),
                        lte: new Date(date_to)
                    },
                },
                select: {
                    id: true,
                    total_amount: true,
                    amount_paid: true,
                    amount_pix: true,
                    amount_money: true,
                    amount_debit: true,
                    amount_credit: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                }
            })
            return payments;
        }

        if (type_payment === 'Dinheiro') {
            const payments = await prismaClient.payment.findMany({
                where: {
                    NOT: {
                        amount_money: ''
                    },
                    table_id: table_id,
                    user_id: user_id,
                    created_at: {
                        gte: new Date(date_from),
                        lte: new Date(date_to)
                    },
                },
                select: {
                    id: true,
                    total_amount: true,
                    amount_paid: true,
                    amount_pix: true,
                    amount_money: true,
                    amount_debit: true,
                    amount_credit: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                }
            })
            return payments;
        }

        if (type_payment === 'PIX') {
            const payments = await prismaClient.payment.findMany({
                where: {
                    NOT: {
                        amount_pix: ''
                    },
                    table_id: table_id,
                    user_id: user_id,
                    created_at: {
                        gte: new Date(date_from),
                        lte: new Date(date_to)
                    },
                },
                select: {
                    id: true,
                    total_amount: true,
                    amount_paid: true,
                    amount_pix: true,
                    amount_money: true,
                    amount_debit: true,
                    amount_credit: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                }
            })
            return payments;
        }

        if (type_payment === 'Débito') {
            const payments = await prismaClient.payment.findMany({
                where: {
                    NOT: {
                        amount_debit: ''
                    },
                    table_id: table_id,
                    user_id: user_id,
                    created_at: {
                        gte: new Date(date_from),
                        lte: new Date(date_to)
                    },
                },
                select: {
                    id: true,
                    total_amount: true,
                    amount_paid: true,
                    amount_pix: true,
                    amount_money: true,
                    amount_debit: true,
                    amount_credit: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                }
            })
            return payments;
        }

        if (type_payment === 'Crédito') {
            const payments = await prismaClient.payment.findMany({
                where: {
                    NOT: {
                        amount_credit: ''
                    },
                    table_id: table_id,
                    user_id: user_id,
                    created_at: {
                        gte: new Date(date_from),
                        lte: new Date(date_to)
                    },
                },
                select: {
                    id: true,
                    total_amount: true,
                    amount_paid: true,
                    amount_pix: true,
                    amount_money: true,
                    amount_debit: true,
                    amount_credit: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                },
                orderBy: {
                    created_at: 'asc'
                }
            })
            return payments;
        }
    }
}

export { ListPaymentsService }