"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Services.module.css";
import { ChevronIcon } from "@/src/icons/Icons";

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
    subServices: [
      { name: "Консультація", price: "500.00" },
      { name: "Консультація + діагностика", price: "1000.00" },
      { name: "Консультація + план лікування", price: "300.00" },
      { name: "Прицільна рентгенографія", price: "100.00" },
      { name: "Знеболення", price: "200.00" },
      { name: "Надання допомоги при гострому болю", price: "400.00" },
      { name: "Нормо-година лікаря стоматолога", price: "400.00" },
    ],
  },
  {
    id: "02",
    name: "Професійна Гігієна Зубів",
    price: "700-3000 ГРН",
    subServices: [
      { name: "Професійна гігієна ротової порожнини", price: "1400.00" },
      {
        name: "Професійна гігієна ротової порожнини ускладнена",
        price: "1700.00",
      },
      { name: "Зняття зубних відкладень апаратом Air-Floy", price: "1000.00" },
      { name: "Ультразвукове зняття зубних відкладень", price: "500.00" },
      { name: "Фотовідбілювання зубних рядів", price: "3000.00" },
      { name: "Дитяча проф.гігієга порожнини рота", price: "700.00" },
    ],
  },
  {
    id: "03",
    name: "Терапія",
    price: "1400-2000 ГРН",
    subServices: [
      {
        name: "Реставрація фронтальної групи зубів (1 поверхні)",
        price: "1600.00",
      },
      {
        name: "Реставрація фронтальної групи зубів (2поверхні)",
        price: "1800.00",
      },
      { name: "Виготовлення силіконового ключа", price: "400.00" },
      { name: "Реставрація жувальної групи зубів", price: "1300.00 - 1600.00" },
      {
        name: "Реставрація фронтальної групи зубів з ураження ріжучого краю",
        price: "3000.00",
      },
      { name: "Моделювання культі зуба під коронку", price: "900.00" },
      {
        name: "Реставрація фронтальної групи зубів з восковим моделюванням",
        price: "2500.00",
      },
    ],
  },
  {
    id: "04",
    name: "Ортодонтія",
    price: "1400-2000 ГРН",
    subServices: [
      { name: "Консультаця ортодонта", price: "500.00" },
      { name: "Консультаця + діагностика", price: "1000.00" },
      { name: "Консультація ортодонта дитяча", price: "300.00" },
      {
        name: "Активація брекет-системи (контрольний огляд )",
        price: "800.00",
      },
      { name: "Брекет-система на одну щелепу лігатурна", price: "16000.00" },
      {
        name: "Брекет-система на одну щелепу самолігатурна",
        price: "19000.00",
      },
      { name: "Встаовлення Мікро-імпланта", price: "2500.00" },
      { name: "Зняття брекет-системи", price: "1200.00" },
      { name: "Ретенційна капа", price: "1400.00" },
      { name: "Фіксація ретейнера", price: "1200.00" },
      { name: "Корекція ретейнера", price: "300.00" },
      { name: "Заміна ретейнера", price: "1500.00" },
      { name: "Заміна брекета", price: "500.00" },
    ],
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
    subServices: [
      { name: "Видалення зуба", price: "800.00" },
      { name: "Видалення рухомого зуба", price: "500.00" },
      { name: "Ускладнене видалення зуба", price: "1200.00" },
      { name: "Видалення верхнього 8 зуба", price: "1500.00" },
      { name: "Видалення нижнього 8 зуба", price: "1800.00" },
      { name: "Атипове видалення 8", price: "2500.00" },
      { name: "Розтин абсцесу, дренаж", price: "500.00" },
      { name: "К'юретаж", price: "300.00" },
      { name: "Встановлення гемостатичної губки", price: "200.00" },
      { name: "Коагуляція ясен", price: "200.00" },
    ],
  },
  {
    id: "07",
    name: "Ендодонтія",
    price: "400-3800 ГРН",
    subServices: [
      { name: "Первинне ендодонтичне лікування (різець)", price: "1800.00" },
      { name: "Первинне ендодонтичне лікування (премоляр)", price: "2300.00" },
      { name: "Первинне ендодонтичне лікування (моляр)", price: "2400.00" },
      { name: "Вторинне ендодонтичне лікування (різець)", price: "2200.00" },
      { name: "Вторинне ендодонтичне лікування (премоляр)", price: "3000.00" },
      { name: "Вторинне ендодонтичне лікування (моляр)", price: "3800.00" },
      { name: "Закриття ендодоступу", price: "400.00" },
      { name: "Преендодонтичне відновлення зуба", price: "500.00" },
    ],
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
                              src="/download-removebg-preview.svg"
                              alt="Tooth"
                              width={49}
                              height={46}
                              className={styles.toothIcon}
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
