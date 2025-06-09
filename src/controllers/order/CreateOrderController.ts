import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) {

        const { table_id, name } = req.body;
        const user_id = req.user_id;

        const service = new CreateOrderService();

        const order = await service.execute({ table_id, name, user_id });

        return res.json(order);
    }
}

export { CreateOrderController }