'use client';

import type { User } from '@/src/interfaces';
import Link from 'next/link'
import { useState } from 'react';
import { IoCardOutline } from 'react-icons/io5'
import { UserRow } from './UserRow';

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {



    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Nombre completo
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Rol
                    </th>
                </tr>
            </thead>
            <tbody>


                {
                    users?.map(user => (
                        <UserRow key={user.id} user={user} />
                    ))
                }

            </tbody>
        </table>
    )
}
