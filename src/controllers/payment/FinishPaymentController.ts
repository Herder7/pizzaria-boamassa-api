import { Request, Response } from "express";
import { FinishPaymentService } from "../../services/payment/FinishPaymentService";

class FinishPaymentController {
    async handle(req: Request, res: Response) {

        const {payment_id, debit, credit, pix, money} = req.body;
        const user_id = req.user_id;

        const service = new FinishPaymentService();

        const category = await service.execute({ payment_id, debit, credit, pix, money, user_id });

        return res.json(category);
    }
}

export { FinishPaymentController }