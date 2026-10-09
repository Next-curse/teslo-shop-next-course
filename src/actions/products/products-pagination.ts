'use server';

import { Gender } from "@/src/generated/prisma/enums";
import { Category } from "@/src/interfaces";
import { prisma } from "@/src/lib/prisma";

interface PaginationOption {
    page?: number;
    take?: number;
    gender?: Category | null;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
    gender
}: PaginationOption) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) page = 0;


    try {


        // 1.- Obtener productos
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * 12,
            include: {
                productImages: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender as Gender
            }
        });

        // 2.- Obtener total de paginas 
        const totalCount = await prisma.product.count({
            where: {
                gender: gender as Gender
            }
        })
        const totalPages = Math.ceil(totalCount / take)

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.productImages.map(img => img.url)
            }))
        }
    } catch (error) {
        throw new Error('ERROR: No hay conexión en la BD')
    }

}