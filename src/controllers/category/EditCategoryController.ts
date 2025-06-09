import { Request, Response } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";

class EditCategoryController {
    async handle(req: Request, res: Response) {

        const { category_id, name } = req.body;
        const user_id = req.user_id;

        const service = new EditCategoryService();

        const category = await service.execute({ category_id, name, user_id });

        return res.json(category);
    }
}

export { EditCategoryController }