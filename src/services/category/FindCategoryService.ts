import prismaClient from "../../prisma";

class FindCategoryService {
    async execute(category_id: string) {

        const category = await prismaClient.category.findFirst({
            where: {
                id: category_id
            },
            select: {
                id: true,
                name: true
            },
        });

        return category;
    }
}

export { FindCategoryService }