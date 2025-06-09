import { Request, Response } from "express";
import { DisableCategoryService } from "../../services/category/DisableCategoryService";

class DisableCategoryController {
    async handle(req: Request, res: Response) {

        const { category_id, disable } = req.body;

        const service = new DisableCategoryService();

        const category = await service.execute({ category_id, disable });

        return res.json(category);
    }
}

export { DisableCategoryController }