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
            У OrthoSpace ви знайдете не просто стоматологію, а команду, яка слухає, підтримує й лікує з турботою.
          </p>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <LocationIcon className={styles.icon} />
              <span className={styles.address}>м. Долина, вул. Обліски 115В</span>
            </div>

            <div className={styles.infoItem}>
              <PhoneIcon />
              <a href="tel:+380505115810" className={styles.phone}>
                050 511 5810
              </a>
            </div>
          </div>

          <p className={styles.text}>
            Завітайте або напишіть нам у Viber чи Telegram — ми відкриті для вас щодня, щоб подбати про вашу усмішку.
          </p>

          <button className={styles.button}>
            <CalendarIcon />
            <span>Записатись на прийом</span>
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937596!2d2.2922926156743895!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sua!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

