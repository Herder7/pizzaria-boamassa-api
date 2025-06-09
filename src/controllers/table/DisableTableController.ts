import { Request, Response } from "express";
import { DisableTableService } from "../../services/table/DisableTableService";

class DisableTableController {
    async handle(req: Request, res: Response) {

        const { table_id, disable } = req.body;

        const service = new DisableTableService();

        const table = await service.execute({ table_id, disable });

        return res.json(table);
    }
}

export { DisableTableController }