export const revalidate = 604800; // 7 días


import { getProductBySlug } from "@/src/actions/products/get-product-by-slug";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/src/components";
import { titleFont } from "@/src/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from './ui/AddToCart';

interface Props {
    params: Promise<{
        slug: string;
    }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    // fetch post information
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`]
        }
    }
}

export default async function ({ params }: Props) {

    const { slug } = await params
    const product = await getProductBySlug(slug);

    if (!product) notFound();


    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
            {/* SlideShow */}

            <div className="col-span-1 md:col-span-2">
                {/* Desktop SlideShow */}

                <ProductSlideShow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />

                {/* Mobile SlideShow */}
                <ProductMobileSlideShow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />
            </div>
            {/* Detalles */}

            <div className="col-span-1 px-5">
                <StockLabel slug={product.slug} />
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">
                    ${product.price}
                </p>

                <AddToCart product={product} />

                {/* Descripcion */}
                <h3 className="font-bold text-sm"> Descripción</h3>
                <p className="font-light"> {product.description}</p>
            </div>
        </div>
    );
}