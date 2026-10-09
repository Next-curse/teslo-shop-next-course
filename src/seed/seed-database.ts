import { initialData } from './seed';
import { prisma } from '../lib/prisma';
import { create } from 'zustand';

async function main() {
    console.log('Seed ejecutado')

    // 1.- Borrar registros previos

    await prisma.orderAddress.deleteMany();
    await prisma.orderItems.deleteMany();
    await prisma.order.deleteMany();


    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();


    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    // Insertar Usuarios
    await prisma.user.createMany({
        data: initialData.users
    })

    // Insertar Categoria
    const categoriesData = initialData.categories.map((name) => ({ name }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();
    // {
    //     'shirt':'UUID'
    // }
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map
    }, {} as Record<string, string>)


    // Insertar Productos
    initialData.products.forEach(async product => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Insertar Imagenes
        const imagesData = images.map(img => ({
            url: img,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        })
    });

    await prisma.country.createMany({
        data: initialData.countries

    })



    console.log('Seed ejecutado coorectamente')
}

(() => {

    if (process.env.NODE_ENV === 'production') return;
    main();
})();
