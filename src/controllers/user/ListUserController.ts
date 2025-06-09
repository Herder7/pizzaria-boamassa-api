import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";

class ListUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const service = new ListUserService();

        const users = await service.execute(user_id);

        return res.json(users);
    }
}

export { ListUserController }