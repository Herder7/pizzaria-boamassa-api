import { Request, Response } from "express";
import { ListProductsMenuService } from "../../services/menu/ListProductsMenuService";

class ListProductsMenuController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string;

        const service = new ListProductsMenuService();

        const products = await service.execute({ category_id });

        return res.json(products);
    }
}

export { ListProductsMenuController }