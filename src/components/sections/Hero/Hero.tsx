import Image from "next/image";
import styles from "./Hero.module.css";
import { PhoneIcon, CalendarIcon } from "@/src/icons/Icons";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Стоматологія OrthoSpace у м. Долина — лікування з посмішкою та без
            болю
          </h1>

          <div className={styles.textBlock}>
            <div className={styles.descriptionsBlock}>
              <p className={styles.description}>
                Ми поєднуємо сучасні технології, комфорт і турботу про кожного
                пацієнта.
              </p>

              <p className={styles.description}>
                Професійна гігієна, терапія, ортодонтія, імплантація та інші
                послуги — все в одному місці.
              </p>
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
            src="/Container.jpg"
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
