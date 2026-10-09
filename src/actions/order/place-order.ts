'use server'

import { auth } from "@/src/auth.config";
import { Address, Size } from "@/src/interfaces";
import { prisma } from "@/src/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
    try {
        const session = await auth();
        const userId = session?.user.id

        if (!userId) {
            return {
                ok: false,
                msg: 'Debes iniciar sesión para hacer la compra del producto'
            }
        };

        // Obtener la info de los productos
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds.map(p => p.productId)
                }
            }
        });
        // Calcular los montos 
        const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

        // Totales de tax, subtotal y total
        const { subTotal, tax, total } = productIds.reduce((totals, item) => {

            const productQuantity = item.quantity;
            const product = products.find(p => p.id === item.productId);

            if (!product) throw new Error('Hubo un error en la creación de la orden');

            const subTotal = product.price * productQuantity;

            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        }, { subTotal: 0, tax: 0, total: 0 });

        // Crear la transacción de base de datos

        const prismaTx = await prisma.$transaction(async (tx) => {

            // 1.- Actualiza el stock de los productos

            const updatedProductsPromises = products.map((product) => {
                // Acumular valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity == 0) {
                    throw new Error(`${product.id}, no tiene cantidad definida`)
                };

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            // Validar si no hay valores negativos = No hay stock

            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene stock disponible`)
                };
            });


            // 2.- Crear la orden - Encabezado - Detalle
            const { country, ...restAddress } = address;
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    orderItems: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    },
                    // 3.- Crear la dirección de la orden
                    orderAddresses: {
                        create: {
                            address: address.address,
                            address2: address.address2,
                            phone: address.phone,
                            postalCode: address.postalCode,
                            firstName: address.firstName,
                            lastName: address.lastName,
                            city: address.city,
                            countryId: country
                        }
                    }
                }
            });
            return {
                order,
                updatedProducts
            }
        });


        return {
            ok: true,
            prismaTx,
            order: prismaTx.order
        }


    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'Ups... Algo paso! Contacte con un administrador'
        }
    }
}