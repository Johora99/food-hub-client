"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import { Button } from "../ui/button";

export default function Hero() {
  const images = [
    {
      img: img1,
      title: "Delicious Food, Delivered Fast",
      content: "Order your favorite meals from top restaurants near you.",
    },
    {
      img: img2,
      title: "Fresh Ingredients, Bold Flavors",
      content: "Taste the quality in every bite, made with love and care.",
    },
    {
      img: img3,
      title: "Your Hunger, Our Priority",
      content: "Hot, fresh, and on-time food delivery at your doorstep.",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Autoplay]}
      className="mySwiper h-[650px]"
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[650px]">
            {/* Hero Image */}
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Perfect Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-4 z-20">
              <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500">
                {item.title}
              </h1>
              <p className="max-w-xl text-2xl text-gray-200">
                {item.content}
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                Order Now 
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
