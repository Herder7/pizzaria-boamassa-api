import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController {
    async handle(req: Request, res: Response) {

        const item_id = req.query.item_id as string;

        const service = new RemoveItemService();

        const order = await service.execute({ item_id });

        return res.json(order);
    }
}

export { RemoveItemController }