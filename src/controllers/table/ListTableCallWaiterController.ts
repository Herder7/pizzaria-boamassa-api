import { Request, Response } from "express";
import { ListTableCallWaiterService } from "../../services/table/ListTableCallWaiterService";

class ListTableCallWaiterController {
    async handle(req: Request, res: Response) {

        const service = new ListTableCallWaiterService();

        const tables = await service.execute();

        return res.json(tables);
    }
}

export { ListTableCallWaiterController }