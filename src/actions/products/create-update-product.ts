'use server'


import { Product } from '@/src/generated/prisma/client'
import { Gender, Size } from '@/src/generated/prisma/enums'
import { prisma } from '@/src/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')


const productSchema = z.object({
    id: z.uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.enum(Gender),

})

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const { data: product, success, error } = productSchema.safeParse(data)

    if (!success) {
        console.log(error)
        return {
            ok: false,
        }
    }

    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            let newOrUpdatedProduct: Product
            const tagsArray = rest.tags.split(',').map(t => t.trim().toLowerCase())
            if (id) {
                newOrUpdatedProduct = await tx.product.update({
                    where: {
                        id
                    },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            } else {
                newOrUpdatedProduct = await tx.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }


            // Proceso de carga y guardado de imagenes

            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);
                if (!images) {
                    throw new Error('No se pudo cargar las imagenes');
                }

                await prisma.productImage.createMany({
                    data: images.map(img => ({
                        url: img!,
                        productId: newOrUpdatedProduct.id
                    }))
                })
            }

            return {
                newOrUpdatedProduct
            }
        })

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${prismaTx.newOrUpdatedProduct.slug}`);
        revalidatePath(`/products/${prismaTx.newOrUpdatedProduct.slug}`);

        return {
            ok: true,
            product: prismaTx.newOrUpdatedProduct

        }
    } catch (error) {
        return {
            ok: false,
            msg: 'No se pudo actualizar'
        }
    }
}





const uploadImages = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64')
                return cloudinary.uploader.upload(`data:image/jpg;base64,${base64Image}`)
                    .then(r => r.secure_url)
            } catch (error) {
                console.log({ error })
                return null;
            }

        })

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.log({ error })
        return null;
    }
}