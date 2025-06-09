import prismaClient from "../../prisma";

class FindProductService {
    async execute(product_id: string) {

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true
            },
        });

        return product;
    }
}

export { FindProductService }