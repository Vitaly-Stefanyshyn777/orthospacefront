"use client";
import Image from "next/image";
import { useState } from "react";
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут буде логіка відправки форми
    console.log({ email, phone, message });
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoWrapper}>
            <Image src="/Logo.svg" alt="Logo" width={60} height={60} />
            <div className={styles.logoText}>
              <h2 className={styles.logoTitle}>OrthoSpace</h2>
              <p className={styles.logoSubtitle}>Romaniv Dental Clinic</p>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>Головна</a>
            <a href="#about" className={styles.navLink}>Про клініку</a>
            <a href="#services" className={styles.navLink}>Послуги</a>
            <a href="#whyus" className={styles.navLink}>Чому ми</a>
            <a href="#specialists" className={styles.navLink}>Спеціалісти</a>
            <a href="#contact" className={styles.navLink}>Контакти</a>
            <a href="#reviews" className={styles.navLink}>Відгуки</a>
          </nav>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
            </div>
            <textarea
              placeholder="Опишіть свою проблему"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
              rows={4}
            />
            <button type="submit" className={styles.submitButton}>
              Залишити заявку
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

