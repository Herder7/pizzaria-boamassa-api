import { Request, Response } from "express";
import { ChangePasswordUserService } from "../../services/user/ChangePasswordUserService";

class ChangePasswordUserController {
    async handle(req: Request, res: Response) {

        const { user_id, old_password, new_password } = req.body;

        const service = new ChangePasswordUserService();

        const user = await service.execute({ user_id, old_password, new_password });

        return res.json(user);
    }
}

export { ChangePasswordUserController }