import { Request, Response } from "express";
import { ListTableService } from "../../services/table/ListTableService";

class ListTableController {
    async handle(req: Request, res: Response) {

        const service = new ListTableService();

        const tables = await service.execute();

        return res.json(tables);
    }
}

export { ListTableController }