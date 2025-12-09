"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./WhyUs.module.css";
import SliderNav from "@/src/components/ui/Button/SliderNav/SliderNavActions";

const features = [
  {
    id: 1,
    title: "Сучасне Обладнання",
    description: "Ми використовуємо європейські технології та 3D-діагностику, щоб лікування було максимально точним і безболісним.",
    variant: "light" as const,
  },
  {
    id: 2,
    title: "Безпека І Комфорт",
    description: "Ми створили простір, де немає страху перед стоматологом. Комфортна анестезія, чистота операційного поля, стерильність на 100%.",
    variant: "dark" as const,
  },
  {
    id: 3,
    title: "Турбота Про Кожного Пацієнта",
    description: "Ми не женемось за кількістю. Для нас важливо, щоб ви вийшли з OrthoSpace з посмішкою, а не просто з рахунком.",
    variant: "light" as const,
  },
  {
    id: 4,
    title: "Досвід І Професіоналізм",
    description: "Команда сертифікованих стоматологів з багаторічним досвідом гарантує якість кожного етапу – від профілактики до імплантації.",
    variant: "dark" as const,
  },
  {
    id: 5,
    title: "Повний Цикл Лікування",
    description: "Від консультації до естетичної реставрації – усе в одному місці, без направлень у інші клініки.",
    variant: "light" as const,
  },
  {
    id: 6,
    title: "Прозорі Ціни",
    description: "Жодних прихованих оплат. Ви завжди знаєте, за що платите і які варіанти лікування доступні саме вам.",
    variant: "dark" as const,
  },
];

export default function WhyUs() {
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
    <section id="whyus" className={styles.whyUs}>
      <div className={styles.container}>
        <h2 className={styles.title}>Чому саме OrthoSpace</h2>

        <div className={styles.introText}>
          <p>
            Наші пацієнти приходять не лише лікувати зуби – вони приходять по спокій, довіру та турботу. Після комплексного лікування ми супроводжуємо кожного пацієнта: проводимо регулярні огляди та професійну гігієну кожні 6 місяців, щоб контролювати результати і підтримувати здоров'я ротової порожнини. Ми завжди поруч – готові відповісти, порадити, допомогти. Це формує довіру та впевненість, що у нас дбають не лише про зуби, а й про людину в кріслі.
          </p>
        </div>

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
              {features.map((feature) => (
                <SwiperSlide key={feature.id} className={styles.swiperSlide}>
                  <div
                    className={`${styles.featureCard} ${styles[feature.variant]}`}
                  >
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {isMobile && (
              <SliderNav
                activeIndex={swiperIndex}
                dots={features.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onDotClick={handleDotClick}
              />
            )}
          </div>
        ) : (
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`${styles.featureCard} ${styles[feature.variant]}`}
              >
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

