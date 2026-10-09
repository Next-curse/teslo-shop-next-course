import type { Size } from "@/src/interfaces";
import clsx from "clsx";


interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChange: (sie: Size) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChange }: Props) => {


    return (
        <div className="my-5 ">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>


            <div className="flex">
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            className={
                                clsx(
                                    "cursor-pointer mx-2 hover:underline",
                                    {
                                        'underline': size === selectedSize
                                    }
                                )
                            }
                            onClick={() => onSizeChange(size)}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
