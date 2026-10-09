'use server'

import { Address } from "@/src/interfaces"
import { prisma } from "@/src/lib/prisma"


export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const saveAddress = await createOrReplaceAddress(address, userId)
        return {
            ok: true,
            address: saveAddress
        }
    } catch (error) {
        console.log({ error })
        return {
            od: false,
            message: 'Algo salió mal'
        }
    }
}





const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {

        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        });


        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            postalCode: address.postalCode,
            phone: address.phone,
            city: address.city
        }

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }
        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressToSave
        })
        return updatedAddress

    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            message: 'Algo salió mal'
        }
    }
}