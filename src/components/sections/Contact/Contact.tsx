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
  name: string;
  address: string;
  workType: string;
  consent: boolean;
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
  } = useForm<FormValues>({
    defaultValues: { workType: "", consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        workType: data.workType,
        message: data.message,
        consent: true,
        address: data.address,
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
        name: "",
        address: "",
        workType: "",
        consent: false,
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
          <div className={styles.leftTopRow}>
            <div className={styles.leftCol}>
              <span className={styles.h1}>
                Jste připraveni začít svůj projekt?
              </span>
              <p>
                Nechte nám žádost a náš specialista vás kontaktuje do hodiny,
                abychom prodiskutovali detaily a provedli bezplatnou prohlídku
                nemovitosti.
              </p>
            </div>
            <div className={styles.leftCollow}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <NumberIcon />
                </span>
                <div className={styles.infoText}>
                  <a href="tel:+420608583115" className={styles.phoneTitle}>
                    +420 608 583 115
                  </a>
                  <p className={styles.phoneSub}>Volejte kdykoli</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <EmailIcon />
                </span>
                <div className={styles.infoText}>
                  <a
                    href="mailto:rekogrinikcz@gmail.com"
                    className={styles.emailTitle}
                  >
                    rekogrinikcz@gmail.com
                  </a>
                  <p className={styles.emailSub}>Odpovídáme do hodiny</p>
                </div>
              </div>
            </div>

            <div className={styles.leftBottom}>
              <div className={styles.scheduleBlock}>
                <div className={styles.timeRow}>
                  <span className={styles.timeIcon}>
                    <TimeIcon />
                  </span>
                  <p>Pracovní doba</p>
                </div>
                <div className={styles.schedule}>
                  <div className={styles.scheduleCol}>
                    <p className={styles.scheduleDays}>Po–Pá</p>
                    <p className={styles.scheduleTime}>08:00 - 20:00</p>
                  </div>
                  <div className={styles.scheduleCol}>
                    <p className={styles.scheduleDays}>Sobota-Neděle</p>
                    <p className={styles.scheduleTime}>09:00 - 18:00</p>
                  </div>
                </div>
              </div>
              <div className={styles.socialBlock}>
                <p className={styles.followTitle}>Kontaktujte nás</p>
                <div className={styles.iconsRow}>
                  <a
                    href="https://www.instagram.com/rekogrinik_s.r.o?igsh=MTlxMHgyYW11N3B0bQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconWrap}
                    aria-label="Instagram"
                  >
                    <Instagram2Icon />
                  </a>
                  <a
                    href="https://wa.me/420608583115"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconWrap}
                    aria-label="WhatsApp"
                  >
                    <WhatsappIcon />
                  </a>
                  <a
                    href="https://t.me/+420608583115"
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
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGrid}>
              <div className={styles.fieldPair}>
                <div className={styles.field}>
                  <input
                    placeholder="E-mailová adresa pro kontakt"
                    {...register("email", {
                      required: "E-mail je povinný",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Neplatný formát e-mailu",
                      },
                    })}
                  />
                  {errors.email && <span className={styles.err}>*</span>}
                </div>
                <div className={styles.field}>
                  <input
                    placeholder="Vaše telefonní číslo"
                    {...register("phone", {
                      required: "Telefon je povinný",
                      pattern: {
                        value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                        message: "Neplatný formát telefonu",
                      },
                    })}
                  />
                  {errors.phone && <span className={styles.err}>*</span>}
                </div>
              </div>
              <div className={styles.fieldPair}>
                <div className={styles.field}>
                  <input
                    placeholder="Jméno pro adresu"
                    {...register("name", {
                      required: "Jméno je povinné",
                      minLength: {
                        value: 2,
                        message: "Minimálně 2 znaky",
                      },
                    })}
                  />
                  {errors.name && <span className={styles.err}>*</span>}
                </div>
                <div className={styles.field}>
                  <input
                    placeholder="Vaše adresa"
                    {...register("address", {
                      required: "Adresa je povinná",
                      minLength: {
                        value: 5,
                        message: "Minimálně 5 znaků",
                      },
                    })}
                  />
                  {errors.address && <span className={styles.err}>*</span>}
                </div>
              </div>
            </div>
            <div className={styles.selectRow}>
              <input
                // list="workTypes"
                placeholder="Vyberte typ práce"
                {...register("workType", {
                  required: "Typ práce je povinný",
                })}
                className={styles.workTypeInput}
              />
              <datalist id="workTypes">
                <option value="Oprava bytu" />
                <option value="Koupelny" />
                <option value="Sádrokarton" />
                <option value="Kompletní rekonstrukce" />
                <option value="Kosmetické opravy" />
              </datalist>
            </div>
            <div className={styles.textareaRow}>
              <textarea
                rows={4}
                placeholder="Řekněte nám více o vašem projektu..."
                {...register("message", {
                  maxLength: {
                    value: 500,
                    message: "Maximálně 500 znaků",
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
                {isSubmitting ? "Odesílání..." : "Odeslat žádost"}
              </button>
              <p className={styles.note}>
                Kliknutím na tlačítko souhlasíte se zpracováním osobních údajů v
                souladu s{" "}
                <Link href="/privacy" className={styles.privacyLink}>
                  zásadami ochrany osobních údajů
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
                  Děkujeme! Žádost přijata (ID: {submitSuccess}).
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
