'use client';

import { useCartStore } from "@/src/store";
import { currencyFormatter } from "@/src/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {
    const router = useRouter();
    const { subTotal, taxes, total, totalQuantity } = useCartStore(useShallow(state => state.getSummaryInformation()))
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        setLoaded(true);
    }, [])

    useEffect(() => {
        if (totalQuantity === 0 && loaded === true) {
            router.replace('/empty')
        }
    }, [totalQuantity, loaded, router])

    if (!loaded) {
        return <p>Cargando tu resumen...</p>
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2"> Resumen de orden</h2>
                <div className="grid grid-cols-2">
                    <span>No. productos</span>
                    <span className="text-right">{totalQuantity} artículos</span>

                    <span>Subtotal</span>
                    <span className="text-right">{currencyFormatter(subTotal)}</span>

                    <span>Impuestos (15%) </span>
                    <span className="text-right">{currencyFormatter(taxes)}</span>

                    <span className="mt-5 text-2xl">Total </span>
                    <span className="mt-5 text-2xl text-right">{currencyFormatter(total)}</span>
                </div>

                <div className="mt-5 mb-2 w-full">
                    <Link
                        className="flex btn-primary justify-center"
                        href={'/checkout/address'}
                    >
                        Checkout
                    </Link>
                </div>
            </div></>
    )
}
