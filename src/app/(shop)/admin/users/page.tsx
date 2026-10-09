export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/src/actions';
import { Title } from '@/src/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function () {

    const { ok, users = [] } = await getPaginatedUsers();


    if (!ok) redirect('/auth/login')

    return (
        <>
            <Title title="Panel de administrador - Usuarios" />

            <div className="mb-10">
                <UsersTable users={users} />
            </div>
        </>
    );
}