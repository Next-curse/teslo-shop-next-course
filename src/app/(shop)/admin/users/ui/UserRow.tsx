'use client';

import { changeUserRole } from "@/src/actions";
import { User } from "@/src/interfaces";
import { useState } from "react";

interface Props {
    user: User
}



export const UserRow = ({ user }: Props) => {

    const [newRole, setNewRole] = useState<'admin' | 'user'>(user.role as 'admin' | 'user');
    return (
        <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                    className='text-sm w-full p-2 border border-gray-200 rounded-md tex-gray-900'
                    value={newRole}
                    onChange={e => setNewRole(e.target.value as 'admin' | 'user')}
                >
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>

                </select>

                {
                    (user.role !== '' && user.role !== newRole)
                    && (
                        <button
                            className="btn-primary ml-2 transition-all fade-in"
                            onClick={() => changeUserRole(user.id, newRole as 'admin' | 'user')}
                        >
                            Actualizar
                        </button>
                    )
                }
            </td>

        </tr>
    )
}


