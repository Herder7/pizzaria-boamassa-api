import { Request, Response } from "express";
import { ListPaymentsService } from "../../services/payment/ListPaymentsService";

class ListPaymentsController {
    async handle(req: Request, res: Response) {

        const { type_payment, table_id, user_id, date_from, date_to } = req.body;

        const service = new ListPaymentsService();

        const payments = await service.execute({ type_payment, table_id, user_id, date_from, date_to });

        return res.json(payments);
    }
}

export { ListPaymentsController }