import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
    async handle(req: Request, res: Response) {

        const product_id = req.query.product_id as string;

        const service = new DeleteProductService();

        const categories = await service.execute(product_id);

        return res.json(categories);
    }
}

export { DeleteProductController }