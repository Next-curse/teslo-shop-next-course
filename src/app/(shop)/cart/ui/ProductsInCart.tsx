'use client';

import { ProductImage, QuantitySelector } from "@/src/components";
import { CartProduct } from "@/src/interfaces";
import { useCartStore } from "@/src/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProduct)

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Cargando tu carrito...</p>
    }
    return (
        <>
            {
                productsInCart.map(product => (

                    <div key={`${product.slug} - ${product.size}`} className="flex mb-5">
                        <ProductImage
                            src={product.image}
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
                            <Link
                                href={`/product/${product.slug}`}
                                className="hover:underline cursor-pointer"
                            >
                                {product.title}
                            </Link>
                            <p>  Talla: {product.size}</p>
                            <p> $ {product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChange={value => updateProductQuantity(product, value)}
                            />
                            <button
                                onClick={() => removeProduct(product)}
                                className="cursor-pointer underline mr-3">
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }</>
    )
}
