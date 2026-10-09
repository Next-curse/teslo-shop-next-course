'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react'

import { logout } from '@/src/actions';
import { useUiStore } from '@/src/store';



export const SideMenu = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
    const closeMenu = useUiStore(state => state.closeSideMenu);


    const { data: session } = useSession();

    const isAuth = !!session?.user;
    const isAdmin = session?.user.role === 'admin'

    return (
        <div>

            {/* BackGorund black */}
            {
                isSideMenuOpen && (
                    <div
                        className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                    />
                )
            }

            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className='fade-in fixed top-0 w-screen h-screen left-0 z-10 backdrop-filter backdrop-blur-sm'
                    />
                )
            }



            {/* SideMenu */}
            <nav

                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>

                <IoCloseOutline
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={closeMenu}
                />


                {/* Input */}

                <div className='relative mt-14 '>
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />
                    <input
                        type="text"
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                    />
                </div>


                {/* Menú */}
                {
                    isAuth && (
                        <>
                            <Link
                                href="/profile"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                onClick={closeMenu}
                            >
                                <IoPersonOutline size={30} />
                                <span className='ml-3 text-3xl'>Perfil</span>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-3 text-3xl'>Ordenes</span>
                            </Link></>
                    )
                }

                {!isAuth &&
                    (<Link
                        href={'/auth/login'}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={closeMenu}
                    >
                        <IoLogInOutline size={30} />
                        <span className='ml-3 text-3xl'>Ingresar</span>
                    </Link>)}
                {isAuth &&
                    (<button
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={() => {
                            closeMenu();
                            window.location.replace('/')
                            logout();
                        }}
                    >
                        <IoLogOutOutline size={30} />
                        <span className='ml-3 text-3xl'>Cerrar sesión</span>
                    </button>)}


                {
                    isAdmin && (
                        <>
                            {/* Line separator */}
                            <div className='w-full h-px bg-gray-200 mr-10' />

                            {/* Admin Options */}
                            <Link
                                href="/admin/products"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                onClick={closeMenu}
                            >
                                <IoShirtOutline size={30} />
                                <span className='ml-3 text-3xl'>Productos</span>
                            </Link>

                            <Link
                                href="/admin/orders"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                onClick={closeMenu}

                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-3 text-3xl'>Ordenes</span>
                            </Link>


                            <Link
                                href="/admin/users"
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                onClick={closeMenu}
                            >
                                <IoPeopleOutline size={30} />
                                <span className='ml-3 text-3xl'>Clientes</span>
                            </Link>
                        </>

                    )
                }


            </nav>
        </div>
    )
}
