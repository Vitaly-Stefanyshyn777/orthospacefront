import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>Про клініку</h2>
        
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              У OrthoSpace Romaniv Dental Clinic ми створили простір, де стоматологія — це не страх, а впевненість.
            </p>
            <p className={styles.paragraph}>
              Наші лікарі дбають про те, щоб кожне відвідування проходило спокійно, комфортно і з результатом, який викликає щиру посмішку.
            </p>
            <p className={styles.paragraph}>
              Ми працюємо з використанням сучасного обладнання, якісних матеріалів і дотримуємося міжнародних стандартів лікування.
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/kamal-hoseinianzade-SjybLeQF6QY-unsplash.jpg"
              alt="Про клініку"
              width={703}
              height={290}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

