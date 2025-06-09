import { Request, Response } from "express";
import { CallWaiterMenuService } from "../../services/menu/CallWaiterMenuService";

class CallWaiterMenuController {
    async handle(req: Request, res: Response) {

        const { table_id, call_waiter } = req.body;

        const service = new CallWaiterMenuService();

        const table = await service.execute({ table_id, call_waiter });

        return res.json(table);
    }
}

export { CallWaiterMenuController }