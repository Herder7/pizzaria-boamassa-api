import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;
        const user_id = req.user_id;

        const service = new FinishOrderService();

        const order = await service.execute({ order_id, user_id });

        return res.json(order);
    }
}

export { FinishOrderController }