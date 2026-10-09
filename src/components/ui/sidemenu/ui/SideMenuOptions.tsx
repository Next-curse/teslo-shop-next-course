import Link from "next/link"
interface Props {
    route: string;
    icon: React.ReactNode;
    title: string;
}

export const SideMenuOptions = ({ route, icon, title }: Props) => {
    return (

        <Link
            href={route}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
            {icon}
            <span className='ml-3 text-3xl'>{title}</span>
        </Link>
    )
}
