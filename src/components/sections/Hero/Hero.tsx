"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import { PhoneIcon, CalendarIcon } from "@/src/icons/Icons";
import { useApiData, HeroData } from "@/src/hooks/useApiData";

// Статичні fallback дані для Hero (за межами компонента)
const heroFallbackData: HeroData = {
  id: 1,
  title: "Стоматологія OrthoSpace у м. Долина — лікування з посмішкою та без болю",
  subtitle: "Ми поєднуємо сучасні технології, комфорт і турботу про кожного пацієнта.\n\nПрофесійна гігієна, терапія, ортодонтія, імплантація та інші послуги — все в одному місці.",
  backgroundImage: "/IMG_8886.JPG",
  backgroundImagePublicId: "hero-default"
};

// Функція для перевірки валідності URL зображення
function getValidImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    return '/IMG_8886.JPG'; // fallback зображення
  }

  try {
    new URL(imageUrl);
    return imageUrl; // URL валідний
  } catch {
    // Якщо це відносний шлях, перевіряємо чи він починається з /
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    // Якщо це не валідний URL і не відносний шлях, повертаємо fallback
    return '/IMG_8886.JPG';
  }
}

export default function Hero() {
  // Отримання даних з API - fallback дані показуються одразу, API дані оновлюють їх
  const { data: heroData } = useApiData<HeroData>("/hero", heroFallbackData);

  // Дані завжди є (fallback або merged з API)
  const title = String(heroData?.title || "");
  const subtitle = String(heroData?.subtitle || "");
  const backgroundImage = getValidImageUrl(heroData?.backgroundImage);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title} style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
            {title}
          </h1>

          <div className={styles.textBlock}>
            <div className={styles.descriptionsBlock}>
              {(() => {
                const paragraphs = subtitle.split('\n\n').filter(p => p.trim());
                // Завжди показуємо мінімум 2 параграфи для консистентності
                const displayParagraphs = paragraphs.length >= 2 ? paragraphs : [
                  paragraphs[0] || "Ми поєднуємо сучасні технології, комфорт і турботу про кожного пацієнта.",
                  paragraphs[1] || "Професійна гігієна, терапія, ортодонтія, імплантація та інші послуги — все в одному місці."
                ];

                return displayParagraphs.slice(0, 2).map((paragraph, index) => (
                  <p key={index} className={styles.description}>
                    {paragraph.trim()}
                  </p>
                ));
              })()}
            </div>

            <div className={styles.actions}>
              <a
                href="https://cliniccards.com/booking/J9oUok9feahjYFJ2hRfuXDCRwAGBbBW8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <CalendarIcon />
                <span>Записатися на прийом</span>
              </a>
              <a href="tel:+380505115810" className={styles.btnSecondary}>
                <PhoneIcon />
                <span>Зв'язатися з нами</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={backgroundImage}
            alt="OrthoSpace"
            width={565}
            height={798}
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
