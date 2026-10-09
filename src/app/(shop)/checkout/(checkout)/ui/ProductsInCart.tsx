'use client';

import { ProductImage } from "@/src/components";
import { useCartStore } from "@/src/store";
import { currencyFormatter } from "@/src/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart)
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
                            src={`/products/${product.image}`}
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
                            <span>
                                {product.title} ({product.quantity})
                            </span>
                            <p>  Talla: {product.size}</p>

                            <p className="font-bold">{currencyFormatter(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }</>
    )
}
