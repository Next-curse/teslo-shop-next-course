'use server'

import { auth } from "@/src/auth.config";
import { prisma } from "@/src/lib/prisma";



export const getPaginatedUsers = async () => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
        return {
            ok: false,
            msg: 'Debe estar autenticado'
        }
    }


    const users = await prisma.user.findMany({
        orderBy: {
            name: "desc"
        }
    });

    return {
        ok: true,
        users
    }
}