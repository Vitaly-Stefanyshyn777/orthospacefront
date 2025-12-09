"use client";
import styles from "./Location.module.css";
import { LocationIcon, PhoneIcon, CalendarIcon } from "@/src/icons/Icons";

export default function Location() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Де нас знайти?</h2>

          <p className={styles.description}>
            У OrthoSpace ви знайдете не просто стоматологію, а команду, яка
            слухає, підтримує й лікує з турботою.
          </p>

          <div className={styles.info}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=49.839664,24.029717"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoItem}
            >
              <LocationIcon className={styles.icon} />
              <span className={styles.address}>
                м. Долина, вул. Обліски 115В
              </span>
            </a>

            <div className={styles.infoItem}>
              <PhoneIcon />
              <a href="tel:+380505115810" className={styles.phone}>
                050 511 5810
              </a>
            </div>
          </div>

          <p className={styles.text}>
            Завітайте або напишіть нам у Viber чи Telegram — ми відкриті для вас
            щодня, щоб подбати про вашу усмішку.
          </p>

          <button className={styles.button}>
            <CalendarIcon />
            <span>Записатись на прийом</span>
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.0730000000003!2d24.029717!3d49.839664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473b0067c0000001%3A0x473b0067c0000001!2s%D0%9E%D0%B1%D0%BB%D1%96%D1%81%D0%BA%D0%B8%20115%D0%92%2C%20%D0%94%D0%BE%D0%BB%D0%B8%D0%BD%D0%B0%2C%20%D0%86%D0%B2%D0%B0%D0%BD%D0%BE-%D0%A4%D1%80%D0%B0%D0%BD%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%2C%2082181!5e0!3m2!1suk!2sua!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
              title="OrthoSpace Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
