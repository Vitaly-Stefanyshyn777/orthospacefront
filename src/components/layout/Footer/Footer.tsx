import Image from "next/image";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.col}>
            <Image src="/Logo.svg" alt="Logo" width={60} height={60} />
            <p className={styles.description}>
              Сучасна ортодонтична клініка
            </p>
          </div>
          
          <div className={styles.col}>
            <h3 className={styles.title}>Навігація</h3>
            <ul className={styles.list}>
              <li><a href="#about" className={styles.link}>Про нас</a></li>
              <li><a href="#services" className={styles.link}>Послуги</a></li>
              <li><a href="#contact" className={styles.link}>Контакти</a></li>
            </ul>
          </div>
          
          <div className={styles.col}>
            <h3 className={styles.title}>Контакти</h3>
            <ul className={styles.list}>
              <li className={styles.text}>+380 XX XXX XX XX</li>
              <li className={styles.text}>info@orthospace.ua</li>
              <li className={styles.text}>м. Київ</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} OrthoSpace. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}

