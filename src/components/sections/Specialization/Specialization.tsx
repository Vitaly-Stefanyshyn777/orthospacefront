"use client";

import Image from "next/image";
import styles from "./Specialization.module.css";
import { CalendarIcon } from "@/src/icons/Icons";
import { useApiData, SpecializationData } from "@/src/hooks/useApiData";

// Статичні fallback дані для Specialization (за межами компонента)
const specializationFallbackData: SpecializationData = {
  id: 1,
  title: "Наша спеціалізація",
  subtitle: "Наша спеціалізація",
  description:
    "Ми спеціалізуємося на ортодонтії та терапії, поєднуючи точність медицини з естетикою посмішки.\n\nКожен наш пацієнт отримує не лише лікування — а гармонію, впевненість і комфорт на кожному етапі.",
  image: "/img1.png",
  imagePublicId: "specialization-default",
};

// Функція для перевірки валідності URL зображення
function getValidImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl || imageUrl === "null" || imageUrl === "undefined") {
    return "/img1.png"; // fallback зображення
  }

  try {
    new URL(imageUrl);
    return imageUrl; // URL валідний
  } catch {
    // Якщо це відносний шлях, перевіряємо чи він починається з /
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }
    // Якщо це не валідний URL і не відносний шлях, повертаємо fallback
    return "/img1.png";
  }
}

export default function Specialization() {
  // Отримання даних з API - fallback дані показуються одразу, API дані оновлюють їх
  const { data: specializationData } = useApiData<SpecializationData>(
    "/specialization",
    specializationFallbackData
  );

  // Дані завжди є (fallback або merged з API)
  const title = String(specializationData?.title || "Наша спеціалізація");
  const description = String(specializationData?.description || "");
  const image = getValidImageUrl(specializationData?.image);

  return (
    <section id="specialization" className={styles.specialization}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt="Наша спеціалізація"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>

          <div className={styles.textBlock}>
            <div className={styles.paragraphsBlock}>
              {description.split("\n\n").map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <button className={styles.button}>
              <CalendarIcon />
              <span>Записатись на прийом</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
