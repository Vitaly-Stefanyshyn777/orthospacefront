"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Gallery.module.css";
import SliderNav from "@/src/components/ui/Button/SliderNav/SliderNavActions";

const galleryImages = [
  {
    id: 1,
    src: "/Frame38.png",
    alt: "Gallery image 1",
    width: 519,
    height: 270,
  },
  {
    id: 2,
    src: "/Frame39.png",
    alt: "Gallery image 2",
    width: 341,
    height: 270,
  },
  {
    id: 3,
    src: "/Frame40.png",
    alt: "Gallery image 3",
    width: 430,
    height: 553,
  },
  {
    id: 4,
    src: "/Frame41.png",
    alt: "Gallery image 4",
    width: 341,
    height: 554,
  },
  {
    id: 5,
    src: "/Frame42.png",
    alt: "Gallery image 5",
    width: 519,
    height: 270,
  },
  {
    id: 6,
    src: "/Frame44.png",
    alt: "Gallery image 6",
    width: 519,
    height: 270,
  },
  {
    id: 7,
    src: "/Frame38.png",
    alt: "Gallery image 7",
    width: 430,
    height: 270,
  },
];

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.title}>Галерея</h2>

        {isMobile ? (
          <div className={styles.mobileSlider}>
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setSwiperIndex(swiper.realIndex);
              }}
              className={styles.swiper}
            >
              {galleryImages.map((img) => (
                <SwiperSlide key={img.id} className={styles.swiperSlide}>
                  <div className={styles.mobileImageWrapper}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className={styles.mobileImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {isMobile && (
              <SliderNav
                activeIndex={swiperIndex}
                dots={galleryImages.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onDotClick={handleDotClick}
                buttonBgColor="#f5f5f5"
                containerClassName={styles.sliderNavWrapper}
              />
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            <div className={styles.leftSection}>
              <div className={styles.topRow}>
                <div className={styles.image1}>
                  <Image
                    src="/Frame38.png"
                    alt="Gallery image 1"
                    width={519}
                    height={270}
                    className={styles.image}
                  />
                </div>
                <div className={styles.image2}>
                  <Image
                    src="/Frame39.png"
                    alt="Gallery image 2"
                    width={341}
                    height={270}
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.bottomRow}>
                <div className={styles.image4}>
                  <Image
                    src="/Frame41.png"
                    alt="Gallery image 4"
                    width={341}
                    height={554}
                    className={styles.image}
                  />
                </div>
                <div className={styles.column}>
                  <div className={styles.image5}>
                    <Image
                      src="/Frame42.png"
                      alt="Gallery image 5"
                      width={519}
                      height={270}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.image6}>
                    <Image
                      src="/Frame44.png"
                      alt="Gallery image 6"
                      width={519}
                      height={270}
                      className={styles.image}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightSection}>
              <div className={styles.image3}>
                <Image
                  src="/Frame40.png"
                  alt="Gallery image 3"
                  width={430}
                  height={553}
                  className={styles.image}
                />
              </div>
              <div className={styles.image7}>
                <Image
                  src="/Frame38.png"
                  alt="Gallery image 7"
                  width={430}
                  height={270}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
