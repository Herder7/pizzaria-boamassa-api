import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {

        const data = req.query.disable as string;

        let disable = undefined;

        if(data === '1') {
            disable = true;
        }

        const service = new ListCategoryService();

        const categories = await service.execute(disable);

        return res.json(categories);
    }
}

export { ListCategoryController }