"use client";
import { useForm } from "react-hook-form";
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
import { useMemo, useState, useEffect } from "react";
import SecondaryInput from "@/src/components/ui/Button/SliderNav/SecondaryInput";
import Multiline from "@/src/components/ui/Button/SliderNav/Multiline";

// Типи для контактних даних відповідно до API
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  telegram?: string;
  viber?: string;
}

interface WorkHours {
  weekdays: string;
  weekdayHours: string;
  weekend: string;
  weekendHours: string;
}

interface ContactInfo {
  title: string;
  description: string;
  phone: string;
  workHours: WorkHours;
  socialLinks: SocialLinks[];
}

interface LocationInfo {
  title: string;
  description: string;
  address: string;
  phone: string;
  viberLink: string;
  telegramLink: string;
}

interface ContactsData {
  contactInfo: ContactInfo;
  locationInfo: LocationInfo;
}

// Конфігурація бекенду
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

type FormValues = {
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Стан для контактних даних
  const [contactsData, setContactsData] = useState<ContactsData | null>(null);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState<string | null>(null);

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

  // Функція отримання контактних даних з API
  const fetchContacts = async () => {
    try {
      setContactsLoading(true);
      setContactsError(null);

      const token = localStorage.getItem("authToken");
      console.log("🚀 Завантаження контактних даних...");
      console.log("📡 URL:", `${BACKEND_URL}/api/v1/public/contacts`);
      console.log("🔑 Token:", token ? "Присутній" : "Відсутній");

      // Отримання даних через API proxy
      const response = await fetch("/api/contacts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // JWT токен для авторизації
        },
      });

      console.log("📨 Статус відповіді:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Отримано контактні дані:", data);

      // Зберігаємо дані в стан компонента
      setContactsData(data);
    } catch (err) {
      console.error("❌ Помилка завантаження контактів:", err);
      setContactsError(err instanceof Error ? err.message : "Невідома помилка");

      // Fallback дані при помилці
      const fallbackData: ContactsData = {
        contactInfo: {
          title: "Зв'яжіться з нами",
          description:
            "Залишіть нам заявку, і наш спеціаліст зв'яжеться з вами протягом години, щоб обговорити деталі та провести безкоштовний огляд.",
          phone: "050 511 5810",
          workHours: {
            weekdays: "Пн-Пт",
            weekdayHours: "08:00 - 20:00",
            weekend: "Сб-Нд",
            weekendHours: "09:00 - 18:00",
          },
          socialLinks: [
            {
              facebook: "https://facebook.com/orthospace",
              instagram: "https://instagram.com/orthospace",
              telegram: "https://t.me/orthospace",
              viber: "viber://chat?number=%2B380505115810",
            },
          ],
        },
        locationInfo: {
          title: "Де нас знайти?",
          description:
            "У OrthoSpace ви знайдете сучасну стоматологічну клініку з комфортними умовами лікування та професійним підходом до кожного пацієнта.",
          address: "м. Долина, вул. Обліски 115В",
          phone: "050 511 5810",
          viberLink: "viber://chat?number=%2B380505115810",
          telegramLink: "https://t.me/orthospace",
        },
      };
      setContactsData(fallbackData);
    } finally {
      setContactsLoading(false);
    }
  };

  // Автоматичне завантаження при ініціалізації
  useEffect(() => {
    fetchContacts(); // Викликається при завантаженні компонента
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>();

  const watchedValues = watch();
  const isFormFilled =
    watchedValues.email?.trim() && watchedValues.phone?.trim();

  console.log("🛠️ Contact component: contactsData:", contactsData);
  console.log("🛠️ Contact component: contactsLoading:", contactsLoading);
  console.log("🛠️ Contact component: contactsError:", contactsError);

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
            <h3 className={styles.sectionTitle}>
              {contactsData?.contactInfo.title || "Зв'яжіться з нами"}
            </h3>
            <p className={styles.sectionDescription}>
              {contactsData?.contactInfo.description ||
                "Залишіть нам заявку, і наш спеціаліст зв'яжеться з вами протягом години, щоб обговорити деталі та провести безкоштовний огляд."}
            </p>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <NumberIcon />
              </span>
              <div className={styles.infoText}>
                <a
                  href={`tel:+38${
                    contactsData?.contactInfo.phone?.replace(/\s/g, "") ||
                    "0505115810"
                  }`}
                  className={styles.phoneTitle}
                >
                  {contactsData?.contactInfo.phone || "050 511 5810"}
                </a>
                <p className={styles.phoneSub}>
                  Телефонуйте{" "}
                  {contactsData?.contactInfo.workHours?.weekdayHours ||
                    "08:00 - 20:00"}
                </p>
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
                <p className={styles.scheduleDays}>
                  {contactsData?.contactInfo.workHours?.weekdays || "Пн-Пт"}
                </p>
                <p className={styles.scheduleTime}>
                  {contactsData?.contactInfo.workHours?.weekdayHours ||
                    "08:00 - 20:00"}
                </p>
              </div>
              <div className={styles.scheduleCol}>
                <p className={styles.scheduleDays}>
                  {contactsData?.contactInfo.workHours?.weekend || "Сб-Нд"}
                </p>
                <p className={styles.scheduleTime}>
                  {contactsData?.contactInfo.workHours?.weekendHours ||
                    "09:00 - 18:00"}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.socialBlock}>
            <p className={styles.followTitle}>Слідкуйте за нами</p>
            <div className={styles.iconsRow}>
              {contactsData?.contactInfo.socialLinks?.[0]?.instagram && (
                <a
                  href={contactsData.contactInfo.socialLinks[0].instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconWrap}
                  aria-label="Instagram"
                >
                  <Instagram2Icon />
                </a>
              )}
              {contactsData?.contactInfo.socialLinks?.[0]?.telegram && (
                <a
                  href={contactsData.contactInfo.socialLinks[0].telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconWrap}
                  aria-label="Telegram"
                >
                  <TelegramIcon />
                </a>
              )}
              {/* WhatsApp fallback - використовуємо телефон з viber link */}
              {contactsData?.locationInfo.viberLink && (
                <a
                  href={contactsData.locationInfo.viberLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconWrap}
                  aria-label="Viber"
                >
                  <WhatsappIcon />
                </a>
              )}
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

            {/* Текст про згоду на обробку даних */}
            <div className={styles.consentContainer}>
              <p className={styles.consentText}>
                Конфіденційність та безпека{" "}
                <a href="/privacy" className={styles.privacyLink}>
                  політики конфіденційності
                </a>
              </p>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.submit} ${
                  !isFormFilled ? styles.submitDisabled : ""
                }`}
                disabled={isSubmitting || !isFormFilled}
              >
                {isSubmitting ? "Відправлення..." : "Залишити за'явку"}
              </button>
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
