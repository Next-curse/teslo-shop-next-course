'use server'
import { prisma } from "@/src/lib/prisma"




export const setTransactionId = async (orderId: string, transactionId: string) => {

    try {
        const response = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId
            }
        })


        return {
            ok: true,
        }

    } catch (error) {
        return {
            ok: false,
            msg: 'Algo salió mal'
        }
    }
}