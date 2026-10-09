'use client';

import { authenticate } from "@/src/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";


export const LoginForm = () => {
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get('callbackUrl') || '/profile';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    const router = useRouter()

    useEffect(() => {
        if (errorMessage === 'Success') {
            //Redireccionar
            window.location.replace('/')
        }
    }, [errorMessage])


    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 bg-gray-200 rounded mb-5"
                type="email"
                name="email"
            />


            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 bg-gray-200 rounded mb-5"
                type="password"
                name="password"
            />

            {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
            <button
                type="submit"
                className={
                    clsx({
                        'btn-primary': !isPending,
                        'btn-disabled': isPending
                    })
                }
                disabled={isPending}
            >
                {
                    isPending
                        ? (<RingSpinner />)
                        : 'Ingresar'
                }
            </button>

            {(errorMessage !== 'Success' && errorMessage) && (
                <div className="flex flex-row mt-2">
                    <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
            )}


            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


export const RingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 border-r-blue-600"></div>
        </div>
    );
}