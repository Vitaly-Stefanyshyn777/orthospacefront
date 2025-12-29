import styles from "./page.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Політика конфіденційності</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Загальні положення</h2>
          <p>
            Ця політика конфіденційності описує, як стоматологічна клініка
            OrthoSpace збирає, використовує та захищає вашу особисту інформацію
            при використанні нашого веб-сайту та послуг.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Збір інформації</h2>
          <p>Ми збираємо такі типи інформації:</p>
          <ul>
            <li>
              <strong>Контактна інформація:</strong> ім'я, телефон, email,
              адреса
            </li>
            <li>
              <strong>Технічна інформація:</strong> IP-адреса, тип браузера,
              операційна система
            </li>
            <li>
              <strong>Інформація про використання:</strong> сторінки, які ви
              відвідуєте, час перебування на сайті
            </li>
            <li>
              <strong>Файли та документи:</strong> завантажені зображення та
              документи
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2.1. Обробка даних з форм</h2>
          <p>
            При заповненні форм на нашому сайті (контактна форма, форма для
            безкоштовної консультації, форма для відправки заявки) ми збираємо
            та обробляємо наступні персональні дані:
          </p>
          <ul>
            <li>
              <strong>Обов'язкові дані:</strong> ім'я, номер телефону, email
              адреса
            </li>
            <li>
              <strong>Додаткові дані:</strong> адреса, повідомлення з описом
              проблеми
            </li>
            <li>
              <strong>Технічні дані:</strong> час відправки форми, IP адреса,
              джерело відвідування (UTM параметри)
            </li>
            <li>
              <strong>Маркетингові дані:</strong> згода на обробку персональних
              даних
            </li>
          </ul>
          <p>
            <strong>Мета обробки:</strong> Ці дані ми використовуємо виключно
            для надання наших стоматологічних послуг, спілкування з вами щодо
            ваших запитів та покращення якості наших послуг.
          </p>
          <p>
            <strong>Правова основа:</strong> Обробка відбувається на основі
            вашої згоди та для цілей виконання договору.
          </p>
          <p>
            <strong>Термін зберігання:</strong> Ваші дані зберігаються протягом
            3 років з моменту останнього контакту або до відкликання згоди на
            обробку.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Використання інформації</h2>
          <p>Ваша інформація використовується для:</p>
          <ul>
            <li>Надання стоматологічних послуг</li>
            <li>Спілкування з вами щодо ваших запитів</li>
            <li>Покращення якості наших послуг</li>
            <li>Відправки важливих повідомлень</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Захист даних</h2>
          <p>
            Ми впроваджуємо відповідні технічні та організаційні заходи для
            захисту ваших персональних даних від несанкціонованого доступу,
            зміни, розголошення або знищення.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            5. Передача даних третім сторонам
          </h2>
          <p>
            Ми не продаємо, не обмінюємо та не передаємо вашу особисту
            інформацію третім сторонам без вашої згоди, за винятком випадків,
            необхідних для надання послуг або виконання юридичних вимог.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Ваші права</h2>
          <p>Ви маєте право:</p>
          <ul>
            <li>Отримати копію ваших персональних даних</li>
            <li>Виправити неточну інформацію</li>
            <li>Видалити ваші дані</li>
            <li>Обмежити обробку ваших даних</li>
            <li>Відкликати згоду на обробку даних</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Cookies</h2>
          <p>
            Наш сайт використовує cookies для покращення функціональності та
            аналізу використання. Ви можете налаштувати ваш браузер для
            відхилення cookies.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Зміни в політиці</h2>
          <p>
            Ми можемо оновлювати цю політику конфіденційності. Будь-які зміни
            будуть опубліковані на цій сторінці з оновленою датою.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Контактна інформація</h2>
          <p>
            Якщо у вас є питання щодо цієї політики конфіденційності, будь
            ласка, зв'яжіться з нами:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> orthospace_rdc@gmail.com
            </li>
            <li>
              <strong>Телефон:</strong> +38 (050) 511-58-10
            </li>
            <li>
              <strong>Адреса:</strong> м. Долина, вул. Обліски 115В
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.lastUpdated}>
            <strong>Останнє оновлення:</strong>{" "}
            {new Date().toLocaleDateString("uk-UA")}
          </p>
        </section>
      </div>
    </div>
  );
}
