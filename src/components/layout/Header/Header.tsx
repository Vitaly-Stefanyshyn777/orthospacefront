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
          <a href="#" className={styles.navLink}>
            Головна
          </a>
          <a href="#" className={styles.navLink}>
            Про клініку
          </a>
          <a href="#" className={styles.navLink}>
            Послуги
          </a>
          <a href="#" className={styles.navLink}>
            Чому ми
          </a>
          <a href="#" className={styles.navLink}>
            Спеціалісти
          </a>
          <a href="#" className={styles.navLink}>
            Наша спеціалізація
          </a>
          <a href="#" className={styles.navLink}>
            Контакти
          </a>
          <a href="#" className={styles.navLink}>
            Де ми?
          </a>
        </nav>

        <div className={styles.actions}>
          <button className={styles.btnCall}>
            <PhoneIcon />
            <span>Подзвонити</span>
          </button>
          <button className={styles.btnAppointment}>
            <CalendarIcon />
            <span>Записатися</span>
          </button>
        </div>
      </div>
    </header>
  );
}

