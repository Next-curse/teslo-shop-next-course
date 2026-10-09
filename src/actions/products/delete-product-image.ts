'use server'

import { prisma } from '@/src/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: number, url: string) => {


    try {
        if (!url.startsWith('http')) {
            return {
                ok: false,
                msg: 'No se pueden borrar imagenes que no esten en cloudinary'
            }
        }

        const imageName = url.split('/').pop()?.split('.')[0] ?? ''

        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/products/${deletedImage.product.slug}`);


        return {
            ok: true,
            mesg: 'Se eliminó la imagen correctamente'
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            msg: ' No se pudo eliminar'
        }
    }

}