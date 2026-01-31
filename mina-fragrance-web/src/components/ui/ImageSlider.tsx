'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface ImageSliderProps {
  images: string[];
  productName: string;
  badge?: string;
}

export function ImageSlider({ images, productName, badge }: ImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Aucune image</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="aspect-square rounded-xl overflow-hidden bg-gray-100"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}

          {badge && (
            <span className="absolute top-4 left-4 z-10 bg-gold text-white text-sm px-3 py-1 rounded">
              {badge}
            </span>
          )}
        </Swiper>

        {/* Custom Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Slide Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          className="thumbnails-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="!w-20 !h-20 cursor-pointer"
            >
              <div
                className={`relative w-full h-full rounded-lg overflow-hidden transition-all ${
                  activeIndex === index
                    ? 'ring-2 ring-rose-500 ring-offset-2'
                    : 'ring-1 ring-gray-200 hover:ring-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
