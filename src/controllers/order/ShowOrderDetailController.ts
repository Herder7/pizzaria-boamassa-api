import { Request, Response } from "express";
import { ShowOrderDetailService } from "../../services/order/ShowOrderDetailService";

class ShowOrderDetailController {
    async handle(req: Request, res: Response) {

        const order_id = req.query.order_id as string;

        const service = new ShowOrderDetailService();

        const order = await service.execute({ order_id });

        return res.json(order);
    }
}

export { ShowOrderDetailController }