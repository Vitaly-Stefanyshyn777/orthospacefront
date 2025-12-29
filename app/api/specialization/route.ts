// API проксі маршрут для Specialization секції
export async function GET(request: Request) {
  console.log('Specialization API proxy: Starting request at', new Date().toISOString());

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    console.log('Specialization API proxy: Fetching from backend:', `${backendUrl}/api/v1/public/specialization`);

    const response = await fetch(`${backendUrl}/api/v1/public/specialization`, {
      headers: {
        'Content-Type': 'application/json',
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Specialization API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Specialization API proxy: Success, received data from backend');

    return Response.json(data);
  } catch (error) {
    console.error('❌ Specialization API proxy error:', error);
    console.log('🔄 Specialization API proxy: Backend unavailable, returning fallback data');

    // Fallback дані
    const fallbackData = {
      id: 1,
      title: "Наша спеціалізація",
      subtitle: "Професійні послуги",
      description: "Ми спеціалізуємося на ортодонтії та терапії, поєднуючи точність медицини з естетикою посмішки.\n\nКожен наш пацієнт отримує не лише лікування — а гармонію, впевненість і комфорт на кожному етапі.",
      image: "/img1.png",
      imagePublicId: "specialization-default"
    };

    return Response.json(fallbackData);
  }
}


