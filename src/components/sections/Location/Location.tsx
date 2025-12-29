"use client";
import { useState, useEffect } from "react";
import styles from "./Location.module.css";
import { LocationIcon, PhoneIcon, CalendarIcon } from "@/src/icons/Icons";

// Типи для даних місцезнаходження відповідно до API
interface LocationInfo {
  title: string;
  description: string;
  address: string;
  phone: string;
  viberLink: string;
  telegramLink: string;
}

interface ContactsData {
  contactInfo: any; // Не використовуємо в цій секції
  locationInfo: LocationInfo;
}

// Конфігурація бекенду
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export default function Location() {
  // Стан для даних місцезнаходження
  const [locationData, setLocationData] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Функція отримання даних місцезнаходження з API
  const fetchLocationData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      console.log("🚀 Завантаження даних місцезнаходження...");
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

      const data: ContactsData = await response.json();
      console.log("✅ Отримано дані місцезнаходження:", data.locationInfo);

      // Зберігаємо тільки дані місцезнаходження
      setLocationData(data.locationInfo);
    } catch (err) {
      console.error("❌ Помилка завантаження даних місцезнаходження:", err);
      setError(err instanceof Error ? err.message : "Невідома помилка");

      // Fallback дані при помилці
      const fallbackData: LocationInfo = {
        title: "Де нас знайти?",
        description:
          "У OrthoSpace ви знайдете сучасну стоматологічну клініку з комфортними умовами лікування та професійним підходом до кожного пацієнта.",
        address: "м. Долина, вул. Обліски 115В",
        phone: "050 511 5810",
        viberLink: "viber://chat?number=%2B380505115810",
        telegramLink: "https://t.me/orthospace",
      };
      setLocationData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Автоматичне завантаження при ініціалізації
  useEffect(() => {
    fetchLocationData(); // Викликається при завантаженні компонента
  }, []);

  console.log("🛠️ Location component: locationData:", locationData);
  console.log("🛠️ Location component: loading:", loading);
  console.log("🛠️ Location component: error:", error);

  if (loading) {
    return (
      <section id="location" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <h2 className={styles.title}>Завантаження...</h2>
            <p className={styles.description}>
              Отримання даних місцезнаходження...
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.mapWrapper}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                Завантаження карти...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="location" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <h2 className={styles.title}>Помилка завантаження</h2>
            <p className={styles.description} style={{ color: "#d00" }}>
              Не вдалося завантажити дані місцезнаходження: {error}
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.mapWrapper}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ffe6e6",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d00",
                }}
              >
                Помилка завантаження карти
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="location" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            {locationData?.title || "Де нас знайти?"}
          </h2>

          <p className={styles.description}>
            {locationData?.description ||
              "У OrthoSpace ви знайдете не просто стоматологію, а команду, яка слухає, підтримує й лікує з турботою."}
          </p>

          <div className={styles.info}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                locationData?.address || "м. Долина, вул. Обліски 115В"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoItem}
            >
              <LocationIcon className={styles.icon} />
              <span className={styles.address}>
                {locationData?.address || "м. Долина, вул. Обліски 115В"}
              </span>
            </a>

            <div className={styles.infoItem}>
              <PhoneIcon />
              <a
                href={`tel:+38${
                  locationData?.phone?.replace(/\s/g, "") || "0505115810"
                }`}
                className={styles.phone}
              >
                {locationData?.phone || "050 511 5810"}
              </a>
            </div>
          </div>

          <p className={styles.text}>
            Завітайте або напишіть нам у{" "}
            {locationData?.viberLink && (
              <a
                href={locationData.viberLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.messengerLink}
              >
                Viber
              </a>
            )}
            {!locationData?.viberLink && "Viber"}
            {" чи "}
            {locationData?.telegramLink && (
              <a
                href={locationData.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.messengerLink}
              >
                Telegram
              </a>
            )}
            {!locationData?.telegramLink && "Telegram"}
            {" — ми відкриті для вас щодня, щоб подбати про вашу усмішку."}
          </p>

          <a
            href="https://cliniccards.com/booking/J9oUok9feahjYFJ2hRfuXDCRwAGBbBW8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <CalendarIcon />
            <span>Записатись на прийом</span>
          </a>
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
