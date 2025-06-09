import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const { name } = req.body;
        const user_id = req.user_id;

        const service = new CreateCategoryService();

        const category = await service.execute({ name, user_id });

        return res.json(category);
    }
}

export { CreateCategoryController }