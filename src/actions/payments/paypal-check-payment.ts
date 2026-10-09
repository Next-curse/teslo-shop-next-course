'use server'

import { PaypalOrderStatusResponse } from "@/src/interfaces";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {

    const authToken = await getPaypalToken();

    if (!authToken) {
        return {
            ok: false,
            msg: 'No se pudo obtener el token de verificación'
        }
    }

    const resp = await verifyPaypalPayment(transactionId, authToken);
    if (!resp) {
        return {
            ok: false,
            msg: 'Error al verificar el pago'
        }
    }


    const { status, purchase_units } = resp
    const { invoice_id: orderId } = purchase_units[0]

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            msg: 'Aun no se ha pagado en PayPal'
        }
    }


    try {

        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        })

        revalidatePath(`orders/${orderId}`)

        return {
            ok: true
        }

    } catch (error) {
        return {
            ok: false,
            msg: '500 - El pago no se pudo realizar'
        }
    }



}




const getPaypalToken = async (): Promise<string | null> => {

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const paypalSecret = process.env.PAYPAL_SECRET_KEY
    const authUrl = process.env.PAYPAL_OAUTH_URL ?? ''

    const base64Token = Buffer.from(
        `${paypalClientId}:${paypalSecret}`,
        "utf-8"
    ).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(authUrl, {
            ...requestOptions,
            cache: "no-store"
        }).then(r => r.json());

        return result.access_token;
    } catch (error) {
        console.log(error)
        return null
    }

}



const verifyPaypalPayment = async (transactionId: string, token: string): Promise<PaypalOrderStatusResponse | null> => {
    const authUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`


    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const resp = await fetch(authUrl, {
            ...requestOptions,
            cache: "no-store"
        }).then(r => r.json());
        return resp;
    } catch (error) {
        console.log(error)
        return null
    }
}