import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string;

        const service = new DeleteCategoryService();

        const categories = await service.execute(category_id);

        return res.json(categories);
    }
}

export { DeleteCategoryController }