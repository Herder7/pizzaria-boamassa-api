import { Request, Response } from "express";
import { UpdateTableService } from "../../services/table/UpdateTableService";

class UpdateTableController {
    async handle(req: Request, res: Response) {

        const { table_id, type, disable } = req.body;

        const service = new UpdateTableService();

        const table = await service.execute({ table_id, type, disable });

        return res.json(table);
    }
}

export { UpdateTableController }