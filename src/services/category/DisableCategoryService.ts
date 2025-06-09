import prismaClient from "../../prisma";

interface CategoryRequest {
    category_id: string;
    disable: boolean;
}

class DisableCategoryService {
    async execute({ category_id, disable }: CategoryRequest) {

        const categoryExist = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });

        if (!categoryExist) {
            throw new Error("Categoria não cadastrada!");
        }

        if (disable) {
            const productsByCategory = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    status: true
                }
            });

            if (productsByCategory.length !== 0) {
                throw new Error("É necessário desabilitar todos os produtos que estão associados nessa categoria!");
            }
        }

        const category = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                status: !disable
            }
        });

        return category;
    }
}

export { DisableCategoryService }