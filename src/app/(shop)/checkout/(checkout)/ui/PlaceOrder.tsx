'use client'

import { useAddressStore, useCartStore } from "@/src/store"
import { useEffect, useState } from "react"
import { AddressInformation } from "./AddressInformation"
import { useShallow } from "zustand/shallow"
import { OrderSummaryCheckout } from "./OrderSummary"
import clsx from "clsx"
import { RingSpinner } from "@/src/app/auth/login/ui/LoginForm"
import { placeOrder } from "@/src/actions"
import { useRouter } from "next/navigation"


export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])
    const address = useAddressStore(state => state.address)
    const { subTotal, taxes, total, totalQuantity } = useCartStore(useShallow(state => state.getSummaryInformation()))
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }));

        const response = await placeOrder(productsToOrder, address);
        if (!response.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(response.msg!)
            return;
        };

        //* Orden creada!
        clearCart();
        router.replace('/orders/' + response.order?.id)
    }

    if (!loaded) {
        return <p>Cargando</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">
            {/* Address Information */}
            <AddressInformation address={address} />
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-6" />

            {/* Order summary */}
            <OrderSummaryCheckout
                taxes={taxes}
                total={total}
                subTotal={subTotal}
                totalQuantity={totalQuantity}
            />
            <div className="mt-5 mb-2 w-full">

                <p className="text-red-500"> {errorMessage}</p>

                <button
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    }
                    disabled={isPlacingOrder}
                    onClick={onPlaceOrder}
                >
                    {
                        isPlacingOrder
                            ? (<RingSpinner />)
                            : 'Colocar orden'
                    }
                </button>
            </div>

        </div>
    )
}
