import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Отримуємо токен бота та chat ID з змінних оточення
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { error: "Telegram bot not configured" },
        { status: 500 }
      );
    }

    // Формуємо повідомлення для Telegram
    const message = `
🦷 Нова заявка з сайту OrthoSpace

📧 Email: ${body.email || "Не вказано"}
📞 Телефон: ${body.phone || "Не вказано"}
💬 Повідомлення: ${body.message || "Не вказано"}
📝 Ім'я: ${body.name || "Не вказано"}
🌐 Мова: ${body.locale || "uk"}
${body.source ? `📊 UTM: ${JSON.stringify(body.source)}` : ""}
    `.trim();

    // Відправляємо повідомлення в Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error("Failed to send message to Telegram");
    }

    const data = await response.json();
    
    return NextResponse.json({
      id: `telegram-${data.result?.message_id || Date.now()}`,
      success: true,
    });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

