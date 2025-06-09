import prismaClient from "../../prisma";

interface MenuRequest {
    category_id: string;
}

class ListProductsMenuService {
    async execute({ category_id }: MenuRequest) {

        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
                status: true,
            },
            orderBy: {
                name: 'asc'
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true
            }
        })

        return products;
    }
}

export { ListProductsMenuService }