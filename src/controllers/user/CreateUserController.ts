import { Request, response, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, perfil } = req.body;

        const service = new CreateUserService();
        
        const user = await service.execute({
            name, email, password, perfil
        });

        return res.json(user);
    }
}

export { CreateUserController }