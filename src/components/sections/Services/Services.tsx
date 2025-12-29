"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Services.module.css";
import { ChevronIcon } from "@/src/icons/Icons";

// Типи даних відповідно до API
interface Service {
  id: number;
  type: string; // "Tooth", "Surgery", etc.
  name: string; // Назва послуги
  price: string; // "500.00"
  isActive: boolean; // Чи активна послуга
  order: number; // Порядок сортування
  categoryId: number; // ID батьківської категорії
}

interface ServiceCategory {
  id: number;
  categoryId: string; // "01", "02", etc.
  mainTitle: string; // Назва категорії
  priceRange: string; // "100-500 ГРН"
  order: number; // Порядок сортування
  isActive: boolean; // Чи активна категорія
  services: Service[]; // Масив послуг цієї категорії
}

// Конфігурація бекенду
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export default function Services() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  // Функція отримання даних з API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      console.log("🚀 Завантаження категорій послуг...");
      console.log("📡 URL:", `${BACKEND_URL}/api/v1/public/services`);
      console.log("🔑 Token:", token ? "Присутній" : "Відсутній");

      // Отримання даних через публічний API
      const response = await fetch(`${BACKEND_URL}/api/v1/public/services`, {
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
      console.log("✅ Отримано категорії:", data);

      // Зберігаємо дані в стан компонента
      setCategories(data);
    } catch (err) {
      console.error("❌ Помилка завантаження:", err);
      setError(err instanceof Error ? err.message : "Невідома помилка");

      // Fallback дані при помилці
      const fallbackData: ServiceCategory[] = [
        {
          id: 1,
          categoryId: "01",
          mainTitle: "Обстеження",
          priceRange: "100-500 ГРН",
          order: 1,
          isActive: true,
          services: [
            {
              id: 1,
              type: "Tooth",
              name: "Консультація",
              price: "500.00",
              isActive: true,
              order: 0,
              categoryId: 1,
            },
            {
              id: 2,
              type: "Tooth",
              name: "Консультація + діагностика",
              price: "1000.00",
              isActive: true,
              order: 1,
              categoryId: 1,
            },
            {
              id: 3,
              type: "Tooth",
              name: "Консультація + план лікування",
              price: "300.00",
              isActive: true,
              order: 2,
              categoryId: 1,
            },
            {
              id: 4,
              type: "Tooth",
              name: "Прицільна рентгенографія",
              price: "100.00",
              isActive: true,
              order: 3,
              categoryId: 1,
            },
          ],
        },
        {
          id: 2,
          categoryId: "02",
          mainTitle: "Професійна Гігієна Зубів",
          priceRange: "700-3000 ГРН",
          order: 2,
          isActive: true,
          services: [
            {
              id: 5,
              type: "Tooth",
              name: "Професійна гігієна ротової порожнини",
              price: "1400.00",
              isActive: true,
              order: 0,
              categoryId: 2,
            },
            {
              id: 6,
              type: "Tooth",
              name: "Ультразвукове зняття зубних відкладень",
              price: "500.00",
              isActive: true,
              order: 1,
              categoryId: 2,
            },
          ],
        },
      ];
      setCategories(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Автоматичне завантаження при ініціалізації
  useEffect(() => {
    fetchCategories(); // Викликається при завантаженні компонента
  }, []);

  const toggleService = (serviceId: string) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  console.log("🛠️ Services component: categories:", categories);
  console.log("🛠️ Services component: loading:", loading);
  console.log("🛠️ Services component: error:", error);

  // Loading стан
  if (loading) {
    return (
      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Наші Послуги</h2>
          </div>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Завантаження послуг...</p>
          </div>
        </div>
      </section>
    );
  }

  // Якщо є помилка, fallback дані вже завантажені, продовжуємо рендеринг

  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Наші Послуги</h2>
          <p className={styles.description}>
            Ми пропонуємо повний спектр стоматологічних послуг для всієї родини.
            Від професійної гігієни до сучасної імплантації та ортодонтії.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.servicesList}>
            {categories.map((category) => {
              const categoryId = category.categoryId;
              const isOpen = openServiceId === categoryId;
              const hasServices =
                category.services && category.services.length > 0;

              return (
                <div key={category.id} className={styles.serviceItem}>
                  <div
                    className={`${styles.serviceHeader} ${
                      hasServices ? styles.clickable : ""
                    }`}
                    onClick={() => hasServices && toggleService(categoryId)}
                  >
                    <span className={styles.serviceNumber}>{categoryId}</span>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>
                        {category.mainTitle}
                      </span>
                      <span className={styles.servicePrice}>
                        {category.priceRange}
                      </span>
                    </div>
                    <div className={styles.arrow}>
                      <ChevronIcon isOpen={isOpen} />
                    </div>
                  </div>

                  {hasServices && isOpen && category.services && (
                    <div className={styles.subServicesContainer}>
                      <div className={styles.subServicesList}>
                        {category.services.map((service, index) => (
                          <div
                            key={service.id}
                            className={styles.subServiceItem}
                          >
                            <Image
                              src="/download-removebg-preview.svg"
                              alt="Tooth"
                              width={49}
                              height={46}
                              className={styles.toothIcon}
                            />
                            <span className={styles.subServiceName}>
                              {service.name}
                            </span>
                            <span className={styles.subServicePrice}>
                              {service.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
