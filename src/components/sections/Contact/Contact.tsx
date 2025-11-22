"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styles from "./Contact.module.css";
import {
  NumberIcon,
  EmailIcon,
  Instagram2Icon,
  TelegramIcon,
  WhatsappIcon,
  TimeIcon,
} from "@/src/icons/Icons";
import { apiClient } from "@/api/client";
import { useMemo, useState } from "react";

type FormValues = {
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Визначаємо мову інтерфейсу як locale для бекенду
  const locale = useMemo(() => {
    if (typeof navigator !== "undefined") {
      return navigator.language?.slice(0, 2) || "uk";
    }
    return "uk";
  }, []);

  // Збір UTM-міток із URL
  const utmSource = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const params = new URLSearchParams(window.location.search);
    const obj: Record<string, string> = {};
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ].forEach((key) => {
      const val = params.get(key);
      if (val) obj[key] = val;
    });
    return Object.keys(obj).length ? obj : undefined;
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);
    try {
      const payload = {
        name: "Contact Form",
        phone: data.phone,
        email: data.email,
        workType: "",
        message: data.message,
        consent: true,
        address: "",
        contactTime: undefined,
        source: utmSource,
        files: undefined,
        locale,
      };
      const res = await apiClient.submitForm(payload);
      setSubmitSuccess(res.id);
      reset({
        email: "",
        phone: "",
        message: "",
      });
    } catch (e: unknown) {
      setSubmitError(
        e instanceof Error ? e.message : "Помилка відправки форми"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Контакти</h2>

          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Зв'яжіться з нами</h3>
            <p className={styles.sectionDescription}>
              Залишіть нам заявку, і наш спеціаліст зв'яжеться з вами протягом
              години, щоб обговорити деталі та провести безкоштовний огляд.
            </p>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <NumberIcon />
              </span>
              <div className={styles.infoText}>
                <a href="tel:+380505115810" className={styles.phoneTitle}>
                  +380505115810
                </a>
                <p className={styles.phoneSub}>Телефонуйте 08:00 - 20:00</p>
              </div>
            </div>
          </div>

          <div className={styles.scheduleBlock}>
            <div className={styles.timeRow}>
              <span className={styles.timeIcon}>
                <TimeIcon />
              </span>
              <p>Графік роботи</p>
            </div>
            <div className={styles.schedule}>
              <div className={styles.scheduleCol}>
                <p className={styles.scheduleDays}>Пн-Пт</p>
                <p className={styles.scheduleTime}>08:00 - 20:00</p>
              </div>
              <div className={styles.scheduleCol}>
                <p className={styles.scheduleDays}>Сб-Нд</p>
                <p className={styles.scheduleTime}>09:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className={styles.socialBlock}>
            <p className={styles.followTitle}>Слідкуйте за нами</p>
            <div className={styles.iconsRow}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconWrap}
                aria-label="Instagram"
              >
                <Instagram2Icon />
              </a>
              <a
                href="https://wa.me/380505115810"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconWrap}
                aria-label="WhatsApp"
              >
                <WhatsappIcon />
              </a>
              <a
                href="https://t.me/+380505115810"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconWrap}
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email обов'язковий",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат email",
                  },
                })}
              />
              {errors.email && <span className={styles.err}>*</span>}
            </div>
            <div className={styles.field}>
              <input
                type="tel"
                placeholder="Телефон"
                {...register("phone", {
                  required: "Телефон обов'язковий",
                  pattern: {
                    value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                    message: "Невірний формат телефону",
                  },
                })}
              />
              {errors.phone && <span className={styles.err}>*</span>}
            </div>
            <div className={styles.textareaRow}>
              <textarea
                rows={4}
                placeholder="Опишіть свою проблему"
                {...register("message", {
                  maxLength: {
                    value: 500,
                    message: "Максимум 500 символів",
                  },
                })}
              ></textarea>
            </div>
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Відправлення..." : "Залишити за'явку"}
              </button>
              <p className={styles.note}>
                Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних
                відповідно до{" "}
                <Link href="/privacy" className={styles.privacyLink}>
                  політики конфіденційності
                </Link>
                .
              </p>
              {submitError && (
                <p className={styles.note} style={{ color: "#d00" }}>
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className={styles.note} style={{ color: "#0a513d" }}>
                  Дякуємо! Заявка прийнята (ID: {submitSuccess}).
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
