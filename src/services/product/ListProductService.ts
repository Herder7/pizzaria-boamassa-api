import prismaClient from "../../prisma";

class ListProductService {
    async execute() {

        const products = await prismaClient.product.findMany({
            orderBy: [
                {
                    name: "asc"
                },
                {
                    category: {
                        name: "asc"
                    }
                }
            ],
            include: {
                category: true
            }
        });

        return products;
    }
}

export { ListProductService }