import { Request, Response } from "express";
import { BusyTableService } from "../../services/table/BusyTableService";

class BusyTableController {
    async handle(req: Request, res: Response) {

        const { number } = req.body;

        const service = new BusyTableService();

        const table = await service.execute(number);

        return res.json(table);
    }
}

export { BusyTableController }