import { Request, Response } from "express";
import { CloseBillMenuService } from "../../services/menu/CloseBillMenuService";

class CloseBillMenuController {
    async handle(req: Request, res: Response) {

        const { table_id, close_bill } = req.body;

        const service = new CloseBillMenuService();

        const table = await service.execute({ table_id, close_bill });

        return res.json(table);
    }
}

export { CloseBillMenuController }