'use server'

import { auth } from "@/src/auth.config";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";




export const changeUserRole = async (userId: string, role: 'admin' | 'user') => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
        return {
            ok: false,
            msg: 'Debe estar autenticado'
        }
    }


    try {

        const newRole = role === 'admin' ? 'admin' : 'user'

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            }
        })

        revalidatePath('/admin/users')
        return {
            ok: true,
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'No se pudo actualizar el rol'
        }
    }


}