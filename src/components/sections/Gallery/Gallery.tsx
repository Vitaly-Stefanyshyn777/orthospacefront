"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Gallery.module.css";
import SliderNav from "@/src/components/ui/Button/SliderNav/SliderNavActions";
import {
  useGeneralGallery,
  useBeforeAfterGallery,
} from "@/src/hooks/useGallery";

// Статичні fallback дані для галереї - 7 зображень
const fallbackGalleryImages = [
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

// Тимчасові тестові дані з API (поки API не працює) - використовуємо локальні зображення з правильними розмірами
const mockApiImages = [
  {
    id: 101,
    image: "/Frame38.png", // 519x270 для image1
    title: "Beautiful dental clinic interior",
    description: "Modern dental office with comfortable chairs",
    albumId: 1,
    width: 519,
    height: 270,
  },
  {
    id: 102,
    image: "/Frame39.png", // 341x270 для image2
    title: "Professional dental equipment",
    description: "State-of-the-art dental technology",
    albumId: 1,
    width: 341,
    height: 270,
  },
  {
    id: 103,
    image: "/Frame40.png", // 430x553 для image3
    title: "Before and After treatment",
    description: "Patient transformation results",
    albumId: 2,
    width: 430,
    height: 553,
  },
  {
    id: 104,
    image: "/Frame41.png", // 341x554 для image4
    title: "Dental consultation room",
    description: "Comfortable consultation space",
    albumId: 1,
    width: 341,
    height: 554,
  },
];

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  // Отримання даних через нову архітектуру API
  const { photos: generalPhotos, loading: generalLoading } =
    useGeneralGallery();
  const { photos: beforeAfterPhotos, loading: beforeAfterLoading } =
    useBeforeAfterGallery();

  const loading = generalLoading || beforeAfterLoading;

  // Підготовка зображень для відображення
  const allPhotos = [...generalPhotos, ...beforeAfterPhotos];

  // Обробляємо фото - API клієнт вже обробив URLs
  const processedPhotos = allPhotos;

  // Перевіряємо, чи є валідні зображення після обробки
  const validApiImages = processedPhotos.filter(
    (photo) => photo.image && photo.image.trim() !== ""
  );

  // Якщо API повертає пусті зображення навіть після обробки, використовуємо mock дані
  const useMockData = validApiImages.length === 0;

  const apiImages = useMockData
    ? mockApiImages.map((photo, index) => ({
        id: photo.id,
        src: photo.image,
        alt: photo.title || photo.description || `Gallery image ${index + 1}`,
        width: photo.width || 519,
        height: photo.height || 270,
      }))
    : validApiImages.map((photo, index) => ({
        id: photo.id,
        src: photo.image,
        alt: photo.title || photo.description || `Gallery image ${index + 1}`,
        width: photo.width || 519,
        height: photo.height || 270,
      }));

  // Вибираємо між API даними та fallback зображеннями
  // Перевага віддається API даним, якщо вони є та валідні
  const galleryImages = validApiImages.length > 0 ? apiImages : fallbackGalleryImages;

  // Консоль логи для перевірки відображення
  console.log("🎨 Gallery Images Display Check:", {
    totalImages: galleryImages.length,
    usingApiData: validApiImages.length > 0,
    usingStaticFallback: validApiImages.length === 0,
    apiImagesCount: validApiImages.length,
    fallbackImagesCount: fallbackGalleryImages.length,
    images: galleryImages.map((img, index) => ({
      slot: index + 1,
      id: img.id,
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      isFromAPI: validApiImages.length > 0 && index < validApiImages.length,
    })),
  });

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
              loop={galleryImages.length >= 3} // Завжди true для 3 зображень
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
                {galleryImages[0] && (
                  <div className={styles.image1}>
                    <Image
                      src={galleryImages[0].src}
                      alt={galleryImages[0].alt}
                      width={galleryImages[0].width}
                      height={galleryImages[0].height}
                      className={styles.image}
                      onError={(e) => {
                        console.error(`❌ Gallery image failed to load: ${galleryImages[0].src}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
                {galleryImages[1] && (
                  <div className={styles.image2}>
                    <Image
                      src={galleryImages[1].src}
                      alt={galleryImages[1].alt}
                      width={galleryImages[1].width}
                      height={galleryImages[1].height}
                      className={styles.image}
                      onError={(e) => {
                        console.error(`❌ Gallery image failed to load: ${galleryImages[1].src}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.bottomRow}>
                {galleryImages[3] && (
                  <div className={styles.image4}>
                    <Image
                      src={galleryImages[3].src}
                      alt={galleryImages[3].alt}
                      width={galleryImages[3].width}
                      height={galleryImages[3].height}
                      className={styles.image}
                      onError={(e) => {
                        console.error(`❌ Gallery image failed to load: ${galleryImages[3].src}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className={styles.column}>
                  {galleryImages[4] && (
                    <div className={styles.image5}>
                      <Image
                        src={galleryImages[4].src}
                        alt={galleryImages[4].alt}
                        width={galleryImages[4].width}
                        height={galleryImages[4].height}
                        className={styles.image}
                        onError={(e) => {
                          console.error(`❌ Gallery image failed to load: ${galleryImages[4].src}`);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  {galleryImages[5] && (
                    <div className={styles.image6}>
                      <Image
                        src={galleryImages[5].src}
                        alt={galleryImages[5].alt}
                        width={galleryImages[5].width}
                        height={galleryImages[5].height}
                        className={styles.image}
                        onError={(e) => {
                          console.error(`❌ Gallery image failed to load: ${galleryImages[5].src}`);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.rightSection}>
              {galleryImages[2] && (
                <div className={styles.image3}>
                  <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    width={galleryImages[2].width}
                    height={galleryImages[2].height}
                    className={styles.image}
                    onError={(e) => {
                      console.error(`❌ Gallery image failed to load: ${galleryImages[2].src}`);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
              {galleryImages[6] && (
                <div className={styles.image7}>
                  <Image
                    src={galleryImages[6].src}
                    alt={galleryImages[6].alt}
                    width={galleryImages[6].width}
                    height={galleryImages[6].height}
                    className={styles.image}
                    onError={(e) => {
                      console.error(`❌ Gallery image failed to load: ${galleryImages[6].src}`);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
