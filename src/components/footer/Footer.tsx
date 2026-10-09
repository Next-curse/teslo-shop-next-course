import { titleFont } from "@/src/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mmb-10">

            <Link
                href={'/'}
                className="mx-3"
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
                <span>| shop</span>
                <span> © {new Date().getFullYear()}</span>
            </Link>

            <Link
                href={'/'}
                className="mx-3"
            >
                Privacidad y legal
            </Link>

            <Link
                href={'/'}
                className="mx-3"
            >
                Tiendas
            </Link>
        </div>
    )
}
