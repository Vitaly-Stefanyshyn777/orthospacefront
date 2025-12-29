// API проксі маршрут для сервісів
export async function GET(request: Request) {
  console.log(
    "🚀 Services API proxy: Starting request at",
    new Date().toISOString()
  );

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    console.log(
      "Services API proxy: Fetching from backend:",
      `${backendUrl}/api/v1/public/services`
    );

    const response = await fetch(`${backendUrl}/api/v1/public/services`, {
      headers: {
        "Content-Type": "application/json",
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Services API proxy: Backend error:", response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const backendData = await response.json();
    console.log("Services API proxy: Received data from backend:", backendData);
    console.log(
      `Services API proxy: Found ${backendData.length} categories from backend`
    );

    // Перетворюємо структуру бекенду в структуру фронтенду
    const activeCategories = backendData.filter(
      (category: any) => category.isActive
    );
    console.log(
      `Services API proxy: ${activeCategories.length} active categories`
    );

    const transformedData = {
      services: activeCategories
        .sort((a: any, b: any) => a.order - b.order) // Сортуємо за порядком
        .map((category: any) => {
          const activeServices = category.services.filter(
            (service: any) => service.isActive
          );
          console.log(
            `Services API proxy: Category "${category.mainTitle}": ${activeServices.length} active services`
          );

          return {
            id: category.id,
            name: category.mainTitle,
            price: category.priceRange,
            subServices: activeServices
              .sort((a: any, b: any) => a.order - b.order) // Сортуємо послуги за порядком
              .map((service: any) => ({
                name: service.name,
                price: service.price,
              })),
          };
        }),
    };

    console.log(
      "Services API proxy: Transformed data for frontend:",
      transformedData
    );
    console.log(
      `Services API proxy: Final result: ${transformedData.services.length} categories with services`
    );
    return Response.json(transformedData);
  } catch (error) {
    console.error("❌ Services API proxy error:", error);
    console.log(
      "🔄 Services API proxy: Backend unavailable, returning fallback data"
    );

    // Fallback дані - оригінальна структура
    const fallbackData = {
      services: [
        {
          id: 1,
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
          id: 2,
          name: "Професійна Гігієна Зубів",
          price: "700-3000 ГРН",
          subServices: [
            { name: "Професійна гігієна ротової порожнини", price: "1400.00" },
            {
              name: "Професійна гігієна ротової порожнини ускладнена",
              price: "1700.00",
            },
            {
              name: "Зняття зубних відкладень апаратом Air-Floy",
              price: "1000.00",
            },
            { name: "Ультразвукове зняття зубних відкладень", price: "500.00" },
            { name: "Фотовідбілювання зубних рядів", price: "3000.00" },
            { name: "Дитяча проф.гігієга порожнини рота", price: "700.00" },
          ],
        },
        {
          id: 3,
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
            {
              name: "Реставрація жувальної групи зубів",
              price: "1300.00 - 1600.00",
            },
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
          id: 4,
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
            {
              name: "Брекет-система на одну щелепу лігатурна",
              price: "16000.00",
            },
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
          id: 5,
          name: "Ортопедія",
          price: "1400-2000 ГРН",
          subServices: [
            { name: "Відбиток двошаровий повний", price: "500.00" },
            { name: "Відбиток двошаровий частковий", price: "300.00" },
            { name: "відбиток альгінатний", price: "200.00" },
            { name: "Коронка металокерамічна", price: "3500.00" },
            {
              name: "Коронка церконієва на фронтальну групу зубів",
              price: "210.00",
            },
            {
              name: "Коронка церконієва на жувальну групу зубів",
              price: "190.00",
            },
          ],
        },
        {
          id: 6,
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
          id: 7,
          name: "Ендодонтія",
          price: "400-3800 ГРН",
          subServices: [
            {
              name: "Первинне ендодонтичне лікування (різець)",
              price: "1800.00",
            },
            {
              name: "Первинне ендодонтичне лікування (премоляр)",
              price: "2300.00",
            },
            {
              name: "Первинне ендодонтичне лікування (моляр)",
              price: "2400.00",
            },
            {
              name: "Вторинне ендодонтичне лікування (різець)",
              price: "2200.00",
            },
            {
              name: "Вторинне ендодонтичне лікування (премоляр)",
              price: "3000.00",
            },
            {
              name: "Вторинне ендодонтичне лікування (моляр)",
              price: "3800.00",
            },
            { name: "Закриття ендодоступу", price: "400.00" },
            { name: "Преендодонтичне відновлення зуба", price: "500.00" },
          ],
        },
      ],
    };

    return Response.json(fallbackData);
  }
}
