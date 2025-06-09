import { Request, Response } from "express";
import { ListTableMenuService } from "../../services/menu/ListTableMenuService";

class ListTableMenuController {
    async handle(req: Request, res: Response) {

        const table = req.query.table as string;

        const service = new ListTableMenuService();

        const getTable = await service.execute({ table });

        return res.json(getTable);
    }
}

export { ListTableMenuController }