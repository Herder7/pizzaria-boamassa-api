import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
    user_id: string;
}

class CreateCategoryService {
    async execute({ name, user_id }: CategoryRequest) {

        //Verificar se a categoria já existe
        if (name === '') {
            throw new Error("Nome da Categoria em branco!");
        }

        //Verificar se a categoria já está cadastrado
        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if (categoryAlreadyExists) {
            throw new Error("Categoria " + name + " já cadastrada!");
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
                user_id: user_id
            },
            select: {
                id: true,
                name: true
            }
        });

        return category;
    }
}

export { CreateCategoryService }