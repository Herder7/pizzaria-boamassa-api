import { Request, Response } from "express";
import { DeletePaymentService } from "../../services/payment/DeletePaymentService";

class DeletePaymentController {
    async handle(req: Request, res: Response) {

        const payment_id = req.query.payment_id as string;

        const service = new DeletePaymentService();

        const category = await service.execute({ payment_id });

        return res.json(category);
    }
}

export { DeletePaymentController }