// API проксі для відправки форми зворотного зв'язку
export async function POST(request: Request) {
  console.log('Form API proxy: Starting request at', new Date().toISOString());

  try {
    const body = await request.json();
    console.log('Form API proxy: Received data:', body);

    // Валідація обов'язкових полів
    if (!body.email || !body.phone || !body.message) {
      return Response.json(
        { error: "Обов'язкові поля: email, phone, message" },
        { status: 400 }
      );
    }

    if (body.consent !== true) {
      return Response.json(
        { error: "Потрібна згода на обробку персональних даних" },
        { status: 400 }
      );
    }

    // Відправляємо на бекенд API
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'}/api/v1/public/form`;
    console.log('Form API proxy: Sending to backend:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        phone: body.phone,
        message: body.message,
        consent: body.consent,
        name: body.name || undefined,
        workType: body.workType || undefined,
        address: body.address || undefined,
        contactTime: body.contactTime || undefined,
        locale: body.locale || 'uk'
      })
    });

    console.log('Form API proxy: Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Form API proxy: Backend error:', response.status, errorText);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log('Form API proxy: Success, received data from backend:', data);

    return Response.json(data);
  } catch (error) {
    console.error('❌ Form API proxy error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

