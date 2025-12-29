// API проксі маршрут для контактів
export async function GET(request: Request) {
  console.log('Contacts API proxy: Starting request at', new Date().toISOString());

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    console.log('Contacts API proxy: Fetching from backend:', `${backendUrl}/api/v1/public/contacts`);

    const response = await fetch(`${backendUrl}/api/v1/public/contacts`, {
      headers: {
        'Content-Type': 'application/json',
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Contacts API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Contacts API proxy: Success, received contacts from backend');

    return Response.json(data);
  } catch (error) {
    console.error('❌ Contacts API proxy error:', error);
    console.log('🔄 Contacts API proxy: Backend unavailable, returning fallback data');

    // Fallback дані відповідно до структури API
    const fallbackData = {
      contactInfo: {
        title: "Зв'яжіться з нами",
        description: "Залишіть нам заявку, і наш спеціаліст зв'яжеться з вами протягом години, щоб обговорити деталі та провести безкоштовний огляд.",
        phone: "050 511 5810",
        workHours: {
          weekdays: "Пн-Пт",
          weekdayHours: "08:00 - 20:00",
          weekend: "Сб-Нд",
          weekendHours: "09:00 - 18:00"
        },
        socialLinks: [
          {
            facebook: "https://facebook.com/orthospace",
            instagram: "https://instagram.com/orthospace",
            telegram: "https://t.me/orthospace",
            viber: "viber://chat?number=%2B380505115810"
          }
        ]
      },
      locationInfo: {
        title: "Де нас знайти?",
        description: "У OrthoSpace ви знайдете сучасну стоматологічну клініку з комфортними умовами лікування та професійним підходом до кожного пацієнта.",
        address: "м. Долина, вул. Обліски 115В",
        phone: "050 511 5810",
        viberLink: "viber://chat?number=%2B380505115810",
        telegramLink: "https://t.me/orthospace"
      }
    };

    return Response.json(fallbackData);
  }
}


