import Image from "next/image";
import styles from "./Specialization.module.css";
import { CalendarIcon } from "@/src/icons/Icons";

export default function Specialization() {
  return (
    <section className={styles.specialization}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наша спеціалізація</h2>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/img1.png"
              alt="Наша спеціалізація"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>

          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Ми спеціалізуємося на ортодонтії та терапії, поєднуючи точність
              медицини з естетикою посмішки.
            </p>
            <p className={styles.paragraph}>
              Кожен наш пацієнт отримує не лише лікування — а гармонію,
              впевненість і комфорт на кожному етапі.
            </p>
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
