'use client'

import { Address } from "@/src/interfaces"

interface Props {
    address: Address
}

export const AddressInformation = ({ address }: Props) => {
    return (
        <>
            <h2 className="text-2xl mb-1"> Dirección de entrega </h2>
            <div className="mb-10 ">
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>
        </>
    )
}
