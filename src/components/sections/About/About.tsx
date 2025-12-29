"use client";

import Image from "next/image";
import styles from "./About.module.css";
import { useApiData, AboutData } from "@/src/hooks/useApiData";

// Статичні fallback дані для About (за межами компонента)
const aboutFallbackData: AboutData = {
  id: 1,
  title: "Про клініку",
  subtitle: "Історія успіху",
  description: "У OrthoSpace Romaniv Dental Clinic ми створили простір, де стоматологія — це не страх, а впевненість.\n\nНаші лікарі дбають про те, щоб кожне відвідування проходило спокійно, комфортно і з результатом, який викликає щиру посмішку.\n\nМи працюємо з використанням сучасного обладнання, якісних матеріалів і дотримуємося міжнародних стандартів лікування.",
  image: "/img21.png",
  imagePublicId: "about-default"
};

// Функція для перевірки валідності URL зображення
function getValidImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    return '/img21.png'; // fallback зображення
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
    return '/img21.png';
  }
}

export default function About() {
  // Отримання даних з API - fallback дані показуються одразу, API дані оновлюють їх
  const { data: aboutData } = useApiData<AboutData>("/aboutus", aboutFallbackData);

  // Дані завжди є (fallback або merged з API)
  const title = String(aboutData?.title || "Про клініку");
  const description = String(aboutData?.description || "");
  const image = getValidImageUrl(aboutData?.image);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.content}>
          <div className={styles.textBlock}>
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt="Про клініку"
              width={703}
              height={290}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
