import { Request, Response } from "express";
import { LoggedOutUserService } from "../../services/user/LoggedOutUserService";

class LoggedOutUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const service = new LoggedOutUserService();

        const user = await service.execute(user_id);

        return res.json(user);
    }
}

export { LoggedOutUserController }