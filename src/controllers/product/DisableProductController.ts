import { Request, Response } from "express";
import { DisableProductService } from "../../services/product/DisableProductService";

class DisableProductController {
    async handle(req: Request, res: Response) {

        const { product_id, disable } = req.body;
        const user_id = req.user_id;

        const service = new DisableProductService();

        const product = await service.execute({ product_id, disable, user_id });

        return res.json(product);
    }
}

export { DisableProductController }