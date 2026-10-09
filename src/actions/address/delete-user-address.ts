'use server'

import { prisma } from "@/src/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {

        const deleted = await prisma.userAddress.delete({
            where: {
                userId
            }
        })
        return {
            ok: true,
            address: deleted
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            message: 'Algo salió mal'
        }
    }

}





