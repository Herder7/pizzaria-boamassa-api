import { Request, Response } from "express";
import { CreateTableService } from "../../services/table/CreateTableService";

class CreateTableController {
    async handle(req: Request, res: Response) {
        const { number } = req.body;
        const user_id = req.user_id;

        const service = new CreateTableService();

        const table = await service.execute({ number, user_id });

        return res.json(table);
    }
}

export { CreateTableController }