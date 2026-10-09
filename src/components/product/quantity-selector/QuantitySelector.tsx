'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import { useState } from 'react';
import clsx from "clsx";

interface Props {
    quantity: number

    onQuantityChange: (quantity: number) => void;
}


export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

    const onValueChange = (value: number) => {
        if (quantity + value < 1) {
            return;
        };
        onQuantityChange(quantity + value)
    }
    return (
        <div className="flex">
            <button
                disabled={quantity <= 1}
                onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline
                    size={20}
                    className={clsx(
                        {
                            'text-gray-500 cursor-not-allowed': quantity <= 1,
                            'cursor-pointer': quantity > 1
                        }
                    )}
                />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded-md">
                {quantity}
            </span>

            <button
                disabled={quantity >= 5}
                onClick={() => onValueChange(1)}>
                <IoAddCircleOutline
                    size={20}
                    className={clsx(
                        {
                            'text-gray-500 cursor-not-allowed': quantity >= 5,
                            'cursor-pointer': quantity < 5
                        }
                    )} />
            </button>

        </div>
    )
}
