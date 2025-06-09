import { Request, Response } from "express";
import { FindCategoryService } from "../../services/category/FindCategoryService";


class FindCategoryController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string;

        const service = new FindCategoryService();

        const categories = await service.execute(category_id);

        return res.json(categories);
    }
}

export { FindCategoryController }