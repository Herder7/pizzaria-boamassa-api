import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
    user_id: string
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id, user_id }: ProductRequest) {

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

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                user_id: user_id
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

export { CreateProductService }