import prismaClient from "../../prisma";

class ListCategoryService {
    async execute(disable: boolean) {

        const categories = await prismaClient.category.findMany({
            where: {
                status: disable === undefined ? undefined : disable
            },
            select: {
                id: true,
                name: true,
                status: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return categories;
    }
}

export { ListCategoryService }