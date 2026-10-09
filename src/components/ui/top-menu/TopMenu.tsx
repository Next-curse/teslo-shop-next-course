'use client';

import Link from "next/link"
import { titleFont } from "@/src/config/fonts"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useCartStore, useUiStore } from "@/src/store";
import { useEffect, useState } from "react";

export const TopMenu = () => {

  const openMenu = useUiStore(state => state.openSideMenu);
  const totalItems = useCartStore(state => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setLoaded(true)
  }, [])


  return (
    <nav className="flex px-5 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link
          href="/"
        >
          <span className={`${titleFont.className} antialiased font-bold`}> Teslo </span>
          <span> | Shop </span>
        </Link>
      </div>


      {/* Center Menú */}

      <div className="flex">
        <div>
          <Link
            href="/gender/men"
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Hombres
          </Link>
        </div >

        <div>
          <Link
            href="/gender/women"
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Mujeres
          </Link>
        </div>

        <div>
          <Link
            href="/gender/kid"
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Niños
          </Link>
        </div>

      </div >

      {/* Search, cart y menu */}
      <div className="flex items-center" >
        <Link
          href="/search"
          className="mx-2"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href=
          {
            ((totalItems === 0) && loaded)
              ? '/empty'
              : '/cart'
          }
          className="mx-2"
        >
          <div className="relative" >
            {
              (loaded && totalItems > 0) && (<span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">{totalItems}</span>)
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="cursor-pointer m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openMenu} >
          Menú
        </button>
      </div>

    </nav >
  )
}
