import prismaClient from "../../prisma";

class DeleteProductService {
    async execute(product_id: string) {

        const productUsed = await prismaClient.item.findFirst({
            where: {
                product_id: product_id
            }
        });

        if(productUsed) {
            throw new Error('Produto já asociado a um pedido!');
        }

        const product = await prismaClient.product.delete({
            where: {
                id: product_id
            }
        });

        return product;
    }
}

export { DeleteProductService }