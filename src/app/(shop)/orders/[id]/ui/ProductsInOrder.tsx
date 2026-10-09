'use client';

import { ProductImage } from "@/src/components";
import { Gender, Size } from "@/src/generated/prisma/enums";
import { useCartStore } from "@/src/store";
import { currencyFormatter } from "@/src/utils";
import Image from "next/image";
import { useEffect, useState } from "react";


interface Props {
    orderItems: ({
        product: {
            productImages: {
                id: number;
                productId: string;
                url: string;
            }[];
        } & {
            sizes: Size[];
            id: string;
            title: string;
            price: number;
            description: string;
            inStock: number;
            slug: string;
            gender: Gender;
            categoryId: string;
            tags: string[];
        };
    } & {
        size: Size;
        id: string;
        quantity: number;
        price: number;
        orderId: string;
        productId: string;
    })[]
}

export const ProductsInOrder = ({ orderItems }: Props) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Cargando tus productos en la orden...</p>
    }
    return (
        <>
            {
                orderItems.map(({ product, ...restProductInOrder }) => (

                    <div key={`${restProductInOrder.size} + ${product.id}`} className="flex mb-5">
                        <ProductImage
                            src={product.productImages[0]?.url}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded-md"
                        />

                        <div>
                            <p> {product.title}</p>
                            <p></p>{currencyFormatter(restProductInOrder.price)} X {restProductInOrder.quantity}
                            <p className="font-bold">Subtotal: {currencyFormatter(restProductInOrder.price * restProductInOrder.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
