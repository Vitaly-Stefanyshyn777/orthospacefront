import Image from "next/image";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.title}>Галерея</h2>

        <div className={styles.grid}>
          <div className={styles.leftSection}>
            <div className={styles.topRow}>
              <div className={styles.image1}>
                <Image
                  src="/Frame38.png"
                  alt="Gallery image 1"
                  width={519}
                  height={270}
                  className={styles.image}
                />
              </div>
              <div className={styles.image2}>
                <Image
                  src="/Frame39.png"
                  alt="Gallery image 2"
                  width={341}
                  height={270}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.bottomRow}>
              <div className={styles.image4}>
                <Image
                  src="/Frame41.png"
                  alt="Gallery image 4"
                  width={341}
                  height={554}
                  className={styles.image}
                />
              </div>
              <div className={styles.column}>
                <div className={styles.image5}>
                  <Image
                    src="/Frame42.png"
                    alt="Gallery image 5"
                    width={519}
                    height={270}
                    className={styles.image}
                  />
                </div>
                <div className={styles.image6}>
                  <Image
                    src="/Frame44.png"
                    alt="Gallery image 6"
                    width={519}
                    height={270}
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.image3}>
              <Image
                src="/Frame40.png"
                alt="Gallery image 3"
                width={430}
                height={553}
                className={styles.image}
              />
            </div>
            <div className={styles.image7}>
              <Image
                src="/Frame38.png"
                alt="Gallery image 7"
                width={430}
                height={270}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
