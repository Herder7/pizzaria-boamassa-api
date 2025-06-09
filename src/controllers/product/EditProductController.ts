import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProductService";

class EditProductController {
    async handle(req: Request, res: Response) {

        const { product_id, name, price, description, category_id } = req.body;
        const user_id = req.user_id;

        const service = new EditProductService();

        if (!req.file) {
            throw new Error("Error upload file!");
        } else {
            const { filename: banner } = req.file;

            const product = await service.execute({ product_id, name, price, description, banner, category_id, user_id });

            return res.json(product);
        }
    }
}

export { EditProductController }