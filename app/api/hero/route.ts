// API проксі маршрут для Hero секції
export async function GET(request: Request) {
  console.log('Hero API proxy: Starting request at', new Date().toISOString());

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    console.log('Hero API proxy: Fetching from backend:', `${backendUrl}/api/v1/public/hero`);

    const response = await fetch(`${backendUrl}/api/v1/public/hero`, {
      headers: {
        'Content-Type': 'application/json',
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Hero API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Hero API proxy: Success, received data from backend');

    return Response.json(data);
  } catch (error) {
    console.error('❌ Hero API proxy error:', error);
    console.log('🔄 Hero API proxy: Backend unavailable, returning fallback data');

    // Fallback дані
    const fallbackData = {
      id: 1,
      title: "Стоматологія OrthoSpace у м. Долина — лікування з посмішкою та без болю",
      subtitle: "Ми поєднуємо сучасні технології, комфорт і турботу про кожного пацієнта.\n\nПрофесійна гігієна, терапія, ортодонтія, імплантація та інші послуги — все в одному місці.",
      backgroundImage: "/IMG_8886.JPG",
      backgroundImagePublicId: "hero-default"
    };

    return Response.json(fallbackData);
  }
}


