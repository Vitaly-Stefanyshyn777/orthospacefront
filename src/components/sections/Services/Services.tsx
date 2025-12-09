"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Services.module.css";
import { ChevronIcon, ToothIcon } from "@/src/icons/Icons";

interface SubService {
  name: string;
  price: string;
}

interface Service {
  id: string;
  name: string;
  price: string;
  subServices?: SubService[];
}

const services: Service[] = [
  {
    id: "01",
    name: "Обстеження",
    price: "100-500 ГРН",
  },
  {
    id: "02",
    name: " Гігієна Зубів",
    price: "700-3000 ГРН",
  },
  {
    id: "03",
    name: "Терапія",
    price: "1400-2000 ГРН",
  },
  {
    id: "04",
    name: "Ортодонтія",
    price: "1400-2000 ГРН",
  },
  {
    id: "05",
    name: "Ортопедія",
    price: "1400-2000 ГРН",
    subServices: [
      { name: "Відбиток двошаровий повний", price: "500.00" },
      { name: "Відбиток двошаровий частковий", price: "300.00" },
      { name: "відбиток альгінатний", price: "200.00" },
      { name: "Коронка металокерамічна", price: "3500.00" },
      { name: "Коронка церконієва на фронтальну групу зубів", price: "210.00" },
      { name: "Коронка церконієва на жувальну групу зубів", price: "190.00" },
    ],
  },
  {
    id: "06",
    name: "Хірургія",
    price: "800-2500 ГРН",
  },
  {
    id: "07",
    name: "Ендодонтія",
    price: "400-3800 ГРН",
  },
];

export default function Services() {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  return (
    <section className={styles.services}>
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
            {services.map((service) => {
              const isOpen = openServiceId === service.id;
              const hasSubServices =
                service.subServices && service.subServices.length > 0;

              return (
                <div key={service.id} className={styles.serviceItem}>
                  <div
                    className={`${styles.serviceHeader} ${
                      hasSubServices ? styles.clickable : ""
                    }`}
                    onClick={() => hasSubServices && toggleService(service.id)}
                  >
                    <span className={styles.serviceNumber}>{service.id}</span>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{service.name}</span>
                      <span className={styles.servicePrice}>
                        {service.price}
                      </span>
                    </div>
                    <div className={styles.arrow}>
                      <ChevronIcon isOpen={isOpen} />
                    </div>
                  </div>

                  {hasSubServices && isOpen && service.subServices && (
                    <div className={styles.subServicesContainer}>
                      <div className={styles.subServicesList}>
                        {service.subServices.map((subService, index) => (
                          <div key={index} className={styles.subServiceItem}>
                            <Image
                              src="/download1.svg"
                              alt="Download"
                              width={49}
                              height={46}
                              className={styles.downloadIcon}
                            />
                            <span className={styles.subServiceName}>
                              {subService.name}
                            </span>
                            <span className={styles.subServicePrice}>
                              {subService.price}
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
