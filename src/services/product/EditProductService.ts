import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
    user_id: string;
}

class EditProductService {
    async execute({ product_id, name, price, description, banner, category_id, user_id }: ProductRequest) {

        const productExist = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        });

        if (!productExist) {
            throw new Error("Produto não cadastrado!");
        }

        //Validar se os campos estão preenchidos.
        if (name === '') {
            throw new Error("Nome está em branco!");
        }

        if (price === '') {
            throw new Error("Preço está em branco!");
        }

        if (description === '') {
            throw new Error("Descrição está em branco!");
        }

        if (category_id === '') {
            throw new Error("Categoria está em branco!");
        } else {
            const category = await prismaClient.category.findFirst({
                where: {
                    id: category_id
                }
            });

            if (!category) {
                throw new Error("Categoria não cadastrada!");
            }
        }

        const productUsed = await prismaClient.item.findFirst({
            where: {
                product_id: product_id
            }
        });

        if (productUsed) {
            throw new Error('Produto já associado a outros pedidos, não pode ser editado!');
        }

        const product = await prismaClient.product.update({
            where: {
                id: product_id
            },
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                user_id: user_id,
                updated_at: new Date()
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true
            }
        });

        return product;

    }
}

export { EditProductService }