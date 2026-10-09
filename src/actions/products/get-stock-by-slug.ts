'use server'

import { prisma } from "@/src/lib/prisma";
import { sleep } from "@/src/utils";


export const getStockBySlug = async (slug: string) => {
    try {
        const stock = await prisma.product.findFirst({
            where: {
                slug
            },
            select: {
                inStock: true
            }
        });

        if (!stock) return 0;
        return stock.inStock ?? 0;

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug')
    }
}