import { Request, Response } from "express";
import { FindProductService } from "../../services/product/FindProductService";


class FindProductController {
    async handle(req: Request, res: Response) {

        const product_id = req.query.product_id as string;

        const service = new FindProductService();

        const products = await service.execute(product_id);

        return res.json(products);
    }
}

export { FindProductController }