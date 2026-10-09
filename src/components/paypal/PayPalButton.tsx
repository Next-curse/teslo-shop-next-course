'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import {
    PayPalProvider,
    PayPalOneTimePaymentButton,
    OnApproveDataOneTimePayments,
} from "@paypal/react-paypal-js/sdk-v6";
import { paypalCheckPayment, setTransactionId } from "@/src/actions";


interface Props {
    orderId: string;
    amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmmount = (Math.round(amount * 100) / 100)

    if (isPending) {
        return (
            <div className="animate-pulse mb-9">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-4" />
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmmount}`,
                    }
                }
            ]
        });

        const { ok } = await setTransactionId(orderId, transactionId)

        if (!ok) {
            throw new Error('No se pudo crear la transacción')
        }

        return transactionId;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const details = await actions.order?.capture();
        if (!details) return;


        await paypalCheckPayment(details.id!);
    }

    return (
        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    )
}
