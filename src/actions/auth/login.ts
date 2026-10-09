'use server';

import { signIn } from '@/src/auth.config';
import { sleep } from '@/src/utils';
import { AuthError } from 'next-auth';
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return 'Success'
    } catch (error) {
        console.log({ error })
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales invalidas.';
                default:
                    return 'UnknownError';
            }
        }
        throw error;
    }
}


export const login = async (email: string, password: string) => {

    try {
        await signIn('credentials', { email, password });
        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo iniciar sesión'
        }
    }

} 