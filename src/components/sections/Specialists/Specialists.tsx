"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./Specialists.module.css";
import SliderNav from "@/src/components/ui/Button/SliderNav/SliderNavActions";

const specialists = [
  {
    id: 1,
    name: "Олександр Ковальчук",
    position: "Лікар-стоматолог-терапевт",
    image: "/Frame22.png",
  },
  {
    id: 2,
    name: "Ірина Долинська",
    position: "Ортодонт",
    image: "/Frame21.png",
  },
  {
    id: 3,
    name: "Тарас Мельник",
    position: "Хірург-стоматолог, імплантолог",
    image: "/Frame23.png",
  },
  {
    id: 4,
    name: "Олена Петренко",
    position: "Стоматолог-терапевт",
    image: "/Frame22.png",
  },
  {
    id: 5,
    name: "Максим Шевченко",
    position: "Ортодонт",
    image: "/Frame21.png",
  },
  {
    id: 6,
    name: "Наталія Іваненко",
    position: "Хірург-стоматолог",
    image: "/Frame23.png",
  },
  {
    id: 7,
    name: "Володимир Бондаренко",
    position: "Імплантолог",
    image: "/Frame22.png",
  },
  {
    id: 8,
    name: "Юлія Кравченко",
    position: "Стоматолог-терапевт",
    image: "/Frame21.png",
  },
  {
    id: 9,
    name: "Андрій Морозенко",
    position: "Ортодонт, хірург",
    image: "/Frame23.png",
  },
];

export default function Specialists() {
  const swiperRef = useRef<any>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleDotClick = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className={styles.specialists}>
      <div className={styles.container}>
        <h2 className={styles.title}>Спеціалісти</h2>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderWindow}>
            <Swiper
              modules={[EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
                scale: 0.8,
              }}
              loop={true}
              speed={600}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                1024: {
                  slidesPerView: "auto",
                  spaceBetween: 20,
                  centeredSlides: true,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setSwiperIndex(swiper.realIndex);
              }}
              className={styles.swiperCustom}
            >
              {specialists.map((specialist) => (
                <SwiperSlide key={specialist.id} className={styles.swiperSlide}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={specialist.image}
                        alt={specialist.name}
                        width={345}
                        height={297}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.name}>{specialist.name}</h3>
                      <p className={styles.position}>{specialist.position}</p>
                      <button className={styles.button}>Записатися</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <SliderNav
            activeIndex={swiperIndex}
            dots={specialists.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onDotClick={handleDotClick}
            buttonBgColor="#ffffff"
            containerClassName={styles.sliderNavWrapper}
          />
        </div>
      </div>
    </section>
  );
}
