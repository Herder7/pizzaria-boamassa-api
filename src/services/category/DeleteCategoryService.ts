import prismaClient from "../../prisma";

class DeleteCategoryService {
    async execute(category_id: string) {

        const categoryUsed = await prismaClient.product.findFirst({
            where: {
                category_id: category_id
            }
        });

        if(categoryUsed) {
            throw new Error('Categoria já asociada a um produto! Favor excluir o produto associado antes de deletar!');
        }

        const category = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        });

        return category;
    }
}

export { DeleteCategoryService }