type SubmitFormPayload = {
  name: string;
  phone: string;
  email: string;
  workType: string;
  message: string;
  consent: boolean;
  address: string;
  contactTime?: string | undefined;
  source?: Record<string, string> | undefined;
  files?: unknown;
  locale: string;
};

type SubmitFormResponse = {
  id: string;
};

class ApiClient {
  /**
   * Заглушка для відправки форми
   * Імітує асинхронну операцію та повертає успішну відповідь
   */
  async submitForm(payload: SubmitFormPayload): Promise<SubmitFormResponse> {
    // Імітація затримки мережевого запиту
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Для тестування помилки - розкоментуйте наступні рядки:
    // if (Math.random() > 0.8) {
    //   throw new Error("Помилка сервера. Спробуйте пізніше.");
    // }

    // Генеруємо унікальний ID для імітації успішної відправки
    const mockId = `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log("📤 Форма відправлена (заглушка):", {
      ...payload,
      id: mockId,
    });

    return {
      id: mockId,
    };
  }
}

export const apiClient = new ApiClient();

