// API проксі маршрут для About секції
export async function GET(request: Request) {
  console.log('About API proxy: Starting request at', new Date().toISOString());

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    console.log('About API proxy: Fetching from backend:', `${backendUrl}/api/v1/public/aboutus`);

    const response = await fetch(`${backendUrl}/api/v1/public/aboutus`, {
      headers: {
        'Content-Type': 'application/json',
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('About API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('About API proxy: Success, received data from backend');

    return Response.json(data);
  } catch (error) {
    console.error('❌ About API proxy error:', error);
    console.log('🔄 About API proxy: Backend unavailable, returning fallback data');

    // Fallback дані
    const fallbackData = {
      id: 1,
      title: "Про клініку",
      subtitle: "OrthoSpace - ваш надійний партнер у стоматологічному здоров'ї",
      description: "Ми - сучасна стоматологічна клініка, яка поєднує професійний підхід, найновітніші технології та турботу про кожного пацієнта.\n\nНаша команда складається з досвідчених спеціалістів, які постійно підвищують свою кваліфікацію та використовують тільки перевірені методи лікування.",
      image: "/img1.png",
      imagePublicId: "about-default"
    };

    return Response.json(fallbackData);
  }
}


