import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(req: Request, res: Response) {

        const service = new ListProductService();

        const products = await service.execute();

        return res.json(products);
    }
}

export { ListProductController }