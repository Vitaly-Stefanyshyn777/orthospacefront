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
import SecondaryInput from "@/src/components/ui/Button/SliderNav/SecondaryInput";
import Multiline from "@/src/components/ui/Button/SliderNav/Multiline";

type FormValues = {
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    watch,
  } = useForm<FormValues>();

  const watchedValues = watch();
  const isFormFilled = watchedValues.email?.trim() && watchedValues.phone?.trim();

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
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
      await apiClient.submitForm(payload);
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
                  050 511 5810
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
            <SecondaryInput
              type="email"
              label="Email"
              {...register("email", {
                required: "Email обов'язковий",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Невірний формат email",
                },
              })}
              hasError={!!errors.email}
              supportingText={errors.email?.message || ""}
            />
            <SecondaryInput
              type="tel"
              label="Телефон"
              onlyDigits={false}
              {...register("phone", {
                required: "Телефон обов'язковий",
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                  message: "Невірний формат телефону",
                },
              })}
              hasError={!!errors.phone}
              supportingText={errors.phone?.message || ""}
            />
            <Multiline
              label="Опишіть свою проблему"
              rows={4}
              {...register("message", {
                maxLength: {
                  value: 500,
                  message: "Максимум 500 символів",
                },
              })}
              hasError={!!errors.message}
              supportingText={errors.message?.message || ""}
            />
            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.submit} ${!isFormFilled ? styles.submitDisabled : ""}`}
                disabled={isSubmitting || !isFormFilled}
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
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
