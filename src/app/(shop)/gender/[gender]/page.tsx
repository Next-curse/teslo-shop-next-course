export const revalidate = 90;


import { getPaginatedProductsWithImages } from "@/src/actions";
import { Pagination, ProductGrid, Title } from "@/src/components";
import { Category } from "@/src/interfaces";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
        gender: Category;
    }>,
    searchParams: Promise<{
        page?: string;
    }>,
}

export default async function ({ params, searchParams }: Props) {

    const { gender } = await params;
    const paramsSearch = await searchParams

    const page = paramsSearch.page ? parseInt(paramsSearch.page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
        page,
        gender
    });

    const productsToShow = products.filter(product => product.gender === gender)

    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }
    const labels: Record<Category, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'para todos'
    }


    return (
        <div>
            <Title title={labels[gender]} subtitle={`Productos para ${labels[gender].toLocaleLowerCase()}`} className="mb-2" />
            <ProductGrid products={productsToShow} />
            <Pagination totalPages={totalPages} />

        </div>
    );
}