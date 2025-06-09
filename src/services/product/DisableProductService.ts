import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
    disable: boolean;
    user_id: string;
}

class DisableProductService {
    async execute({ product_id, disable, user_id }: ProductRequest) {

        const productExist = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            include: {
                category: true
            }
        });

        if (!productExist) {
            throw new Error("Produto não cadastrado!");
        }

        if (!productExist.category.status) {
            throw new Error("A categoria associada a esse produto deve estar habilitada!");
        }

        const product = await prismaClient.product.update({
            where: {
                id: product_id
            },
            data: {
                status: !disable,
                user_id: user_id,
                updated_at: new Date()
            }
        });

        return product;
    }
}

export { DisableProductService }