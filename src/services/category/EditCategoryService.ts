import prismaClient from "../../prisma";

interface CategoryRequest {
    category_id: string;
    name: string;
    user_id: string;
}

class EditCategoryService {
    async execute({ category_id, name, user_id }: CategoryRequest) {

        const categoryVerify = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });

        if (!categoryVerify) {
            throw new Error("Categoria não cadastrada!");
        }

        const categoryUsed = await prismaClient.product.findFirst({
            where: {
                category_id: category_id
            }
        });

        if (categoryUsed) {
            throw new Error("Categoria já associada a outros produtos, não pode ser editada!");
        }

        const category = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                name: name,
                user_id: user_id,
                updated_at: new Date()
            }
        });

        return category;

    }
}

export { EditCategoryService }