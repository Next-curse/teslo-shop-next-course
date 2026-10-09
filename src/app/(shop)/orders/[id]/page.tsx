import { getOrderById } from "@/src/actions";
import { PayPalButton, Title } from "@/src/components";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { IoCardOutline } from 'react-icons/io5';
import { AddressInformation } from "./ui/AddressInformation";
import { Address } from "@/src/interfaces";
import { OrderSummary } from "./ui/OrderSummary";
import { ProductsInOrder } from "./ui/ProductsInOrder";
import { IsPaidInformation } from "./ui/IsPaidInformation";

interface Props {
    params: Promise<{
        id: string;
    }>
}


export default async function ({ params }: Props) {

    const { id } = await params;

    const { order } = await getOrderById(id);
    if (order === null) notFound();

    const { orderItems, orderAddresses, tax, subTotal, total, itemsInOrder, isPaid } = order;
    const address = {
        ...orderAddresses,
        country: orderAddresses!.country.name
    } as Address;


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">
                <Title title={`Orden #${id.split('-').at(-1)}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gal-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <IsPaidInformation isPaid={isPaid} />
                        {/* Items */}
                        <ProductsInOrder
                            orderItems={orderItems}
                        />
                    </div>


                    {/* Summary */}
                    <div className="bg-white rounded-xl shadow-xl p-7 mx-4">

                        <AddressInformation
                            address={address}
                        />

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-6" />


                        <OrderSummary
                            subTotal={subTotal}
                            taxes={tax}
                            total={total}
                            totalQuantity={itemsInOrder}
                        />

                        <div className="mt-6">

                            {
                                isPaid
                                    ? (<IsPaidInformation isPaid={isPaid} />)
                                    : (<PayPalButton
                                        orderId={order.id}
                                        amount={total!}
                                    />)
                            }
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}