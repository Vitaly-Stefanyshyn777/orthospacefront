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
   * Відправка форми на Telegram бота
   */
  async submitForm(payload: SubmitFormPayload): Promise<SubmitFormResponse> {
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка відправки форми");
      }

      const data = await response.json();
      return {
        id: data.id || `form-${Date.now()}`,
      };
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error instanceof Error
        ? error
        : new Error("Помилка відправки форми");
    }
  }
}

export const apiClient = new ApiClient();

