import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response) {

        const { user_id, name, email } = req.body;

        const service = new UpdateUserService();

        const user = await service.execute({ user_id, name, email });

        return res.json(user);
    }
}

export { UpdateUserController }