'use client';

import { useCartStore } from "@/src/store";
import { currencyFormatter } from "@/src/utils";
import Link from "next/link";

interface Props {
    totalQuantity: number;
    subTotal: number;
    taxes: number;
    total: number;
}

export const OrderSummaryCheckout = ({ taxes, total, totalQuantity, subTotal }: Props) => {
    return (
        <>
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
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
        </>
    )
}
