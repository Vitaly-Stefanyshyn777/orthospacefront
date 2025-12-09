"use client";
import Image from "next/image";
import { useState } from "react";
import styles from './Footer.module.css';
import SecondaryInput from "@/src/components/ui/Button/SliderNav/SecondaryInput";
import Multiline from "@/src/components/ui/Button/SliderNav/Multiline";
import { apiClient } from "@/api/client";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isFormFilled = email.trim() && phone.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        name: "Footer Form",
        phone: phone,
        email: email,
        workType: "",
        message: message,
        consent: true,
        address: "",
        contactTime: undefined,
        source: undefined,
        files: undefined,
        locale: "uk",
      };

      await apiClient.submitForm(payload);
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (e: unknown) {
      setSubmitError(
        e instanceof Error ? e.message : "Помилка відправки форми"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoWrapper}>
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />
            <div className={styles.logoText}>
              <h2 className={styles.logoTitle}>OrthoSpace</h2>
              <p className={styles.logoSubtitle}>Romaniv Dental Clinic</p>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <nav className={styles.nav}>
            <div className={styles.navColumn}>
              <a href="#hero" className={styles.navLink}>Головна</a>
              <a href="#about" className={styles.navLink}>Про клініку</a>
              <a href="#services" className={styles.navLink}>Послуги</a>
            </div>
            <div className={styles.navColumn}>
              <a href="#whyus" className={styles.navLink}>Чому ми</a>
              <a href="#specialists" className={styles.navLink}>Спеціалісти</a>
              <a href="#specialization" className={styles.navLink}>Наша спеціалізація</a>
              <a href="#contact" className={styles.navLink}>Контакти</a>
              <a href="#location" className={styles.navLink}>Де ми?</a>
            </div>
          </nav>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <SecondaryInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SecondaryInput
                type="tel"
                label="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Multiline
              label="Опишіть свою проблему"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className={`${styles.submitButton} ${!isFormFilled ? styles.submitButtonDisabled : ""}`}
              disabled={!isFormFilled || isSubmitting}
            >
              {isSubmitting ? "Відправлення..." : "Залишити заявку"}
            </button>
            {submitError && (
              <p className={styles.note} style={{ color: "#d00" }}>
                {submitError}
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}

