'use client';
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import clsx from 'clsx';
import { login, registerUser } from '@/src/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


type FormInputs = {
    name: string;
    email: string;
    password: string;
}


export const RegisterForm = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();


    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('')
        const { name, email, password } = data
        const resp = await registerUser(name, email, password);
        if (!resp.ok) {
            setErrorMessage(resp.message ?? 'a')
            return;
        };

        await login(email.toLowerCase(), password);
        window.location.replace('/profile');

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="name">Nombre completo</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': errors.name
                    }
                )}
                type="text"
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Correo electrónico</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': errors.email
                    }
                )}
                type="email"
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}

            />


            <label htmlFor="password">Contraseña</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': errors.password
                    }
                )}
                type="password"
                {...register('password', { required: true, minLength: 6 })}

            />


            {
                errorMessage && (
                    <span className='text-red-500'>
                        {errorMessage}
                    </span>
                )
            }
            <button
                type='submit'
                className="btn-primary">
                Crear una nueva cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
