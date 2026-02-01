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
    <Image
      src={item.img}
      alt={`Slide ${index + 1}`}
      fill
      className="object-cover"
      priority={index === 0}
    />

    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="text-white text-5xl font-bold">
        {item.title}
      </h1>
      <p>
        {item.content}
      </p>
      
    </div>
  </div>
</SwiperSlide>

      ))}
    </Swiper>
  );
}
