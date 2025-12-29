// API проксі маршрут для списку альбомів галереї
export async function GET(request: Request) {
  console.log('Gallery Albums API proxy: Starting request at', new Date().toISOString());

  try {
    // Отримуємо дані з бекенду
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    console.log('Gallery Albums API proxy: Fetching from backend:', `${backendUrl}/api/v1/public/gallery/albums`);

    const response = await fetch(`${backendUrl}/api/v1/public/gallery/albums`, {
      headers: {
        'Content-Type': 'application/json',
        // Можна додати Authorization якщо потрібно
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Gallery Albums API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Gallery Albums API proxy: Success, received albums from backend');

    return Response.json(data);
  } catch (error) {
    console.error('❌ Gallery Albums API proxy error:', error);
    console.log('🔄 Gallery Albums API proxy: Backend unavailable, returning fallback data');

    // Fallback дані
    const fallbackData = [
      { id: 1, name: "General", slug: "general", type: "GENERAL" },
      { id: 2, name: "Before & After", slug: "before-after", type: "BEFORE_AFTER" }
    ];

    return Response.json(fallbackData);
  }
}


