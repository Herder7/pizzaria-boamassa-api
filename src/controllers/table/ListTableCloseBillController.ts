import { Request, Response } from "express";
import { ListTableCloseBillService } from "../../services/table/ListTableCloseBillService";

class ListTableCloseBillController {
    async handle(req: Request, res: Response) {

        const service = new ListTableCloseBillService();

        const tables = await service.execute();

        return res.json(tables);
    }
}

export { ListTableCloseBillController }