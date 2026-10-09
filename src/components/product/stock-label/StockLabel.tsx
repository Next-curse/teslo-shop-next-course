'use client';

import { getStockBySlug } from '@/src/actions';
import { titleFont } from '@/src/config/fonts'
import React, { useEffect, useState } from 'react'

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {


    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            setLoading(true)
            const stockProduct = await getStockBySlug(slug);
            setStock(stockProduct)
            setLoading(false)
        }
        getStock();
    }, [slug])



    return (
        <>
            {
                loading
                    ? (<h1 className={`${titleFont.className} antialiased font-bold rounded-md text-xl bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>)
                    : (<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                        Stock: {stock}
                    </h1>)

            }
        </>
    )
}
