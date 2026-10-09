'use server'

import { prisma } from "@/src/lib/prisma"




export const getOrderById = async (id: string) => {

    // Recuperar la orden
    const order = await prisma.order.findFirst({
        where: {
            id: id
        },
        include: {
            orderItems: {
                include: {
                    product: {
                        include: {
                            productImages: {
                                take: 1
                            }
                        }
                    }
                }
            },
            orderAddresses: {
                include: {
                    country: true
                }
            }
        }
    });


    return {
        order: order
    }

}