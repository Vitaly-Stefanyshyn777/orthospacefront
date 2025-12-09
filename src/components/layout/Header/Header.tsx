import Image from "next/image";
import styles from "./Header.module.css";
import { PhoneIcon, CalendarIcon } from "@/src/icons/Icons";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/Logo.png" alt="Logo" width={60} height={60} />
        </div>

        <nav className={styles.nav}>
          <a href="#hero" className={styles.navLink}>
            Головна
          </a>
          <a href="#about" className={styles.navLink}>
            Про клініку
          </a>
          <a href="#services" className={styles.navLink}>
            Послуги
          </a>
          <a href="#whyus" className={styles.navLink}>
            Чому ми
          </a>
          <a href="#specialists" className={styles.navLink}>
            Спеціалісти
          </a>
          <a href="#specialization" className={styles.navLink}>
            Наша спеціалізація
          </a>
          <a href="#contact" className={styles.navLink}>
            Контакти
          </a>
          <a href="#location" className={styles.navLink}>
            Де ми?
          </a>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+380505115810" className={styles.btnCall}>
            <PhoneIcon />
            <span>Подзвонити</span>
          </a>
          <a
            href="https://cliniccards.com/booking/J9oUok9feahjYFJ2hRfuXDCRwAGBbBW8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnAppointment}
          >
            <CalendarIcon />
            <span>Записатися</span>
          </a>
        </div>
      </div>
    </header>
  );
}

