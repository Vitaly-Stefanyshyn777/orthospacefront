// API проксі маршрут для галереї
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const album = searchParams.get("album") || "general";

    console.log('Gallery API proxy: Fetching album:', album);

    // URL бекенду - має відповідати порту, на якому запущений бекенд
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
    const response = await fetch(`${backendUrl}/api/v1/public/gallery/albums/${album}`);

    if (!response.ok) {
      console.error('Gallery API proxy: Backend error:', response.status);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Gallery API proxy: Success, data received');

    return Response.json(data);
  } catch (error) {
    console.error("Gallery API proxy error:", error);

    // Fallback дані
    const fallbackData = {
      album: {
        id: 1,
        name: "Gallery",
        slug: "gallery",
        type: "GENERAL"
      },
      photos: [],
      pairs: [],
      collections: []
    };

    return Response.json(fallbackData);
  }
}

