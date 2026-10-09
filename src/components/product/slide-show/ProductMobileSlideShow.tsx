'use client'
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
    return (
        <div className={className}>

            <Swiper
                style={{
                    width: '100vw',
                    height: '500px'
                }}
                pagination
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(img => (
                        <SwiperSlide key={img}>
                            <ProductImage
                                src={img}
                                width={600}
                                height={500}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}




