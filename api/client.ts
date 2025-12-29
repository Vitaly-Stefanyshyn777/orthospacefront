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

// Типи для галереї
export type GalleryAlbum = {
  id: number;
  name: string;
  slug: string;
  type: 'GENERAL' | 'BEFORE_AFTER';
};

export type GalleryPhoto = {
  id: number;
  image: string;
  url?: string;
  title?: string;
  description?: string;
  albumId: number;
  width?: number;
  height?: number;
  imagePublicId?: string;
  tag?: string;
  createdAt?: string;
  updatedAt?: string;
};

type GalleryResponse = {
  album: GalleryAlbum;
  photos: GalleryPhoto[];
  pairs?: any[];
  collections?: any[];
};

class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';

  /**
   * Відправка форми зворотного зв'язку через API проксі
   */
  async submitForm(payload: SubmitFormPayload): Promise<SubmitFormResponse> {
    try {
      // Використовуємо API проксі для уникнення CORS проблем
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
          consent: payload.consent,
          name: payload.name,
          workType: payload.workType,
          address: payload.address,
          contactTime: payload.contactTime,
          locale: payload.locale
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Помилка відправки форми`);
      }

      const data = await response.json();
      console.log('✅ Форма успішно відправлена:', data);

      return {
        id: data.id || `form-${Date.now()}`,
      };
    } catch (error) {
      console.error("❌ Помилка відправки форми:", error);
      throw error instanceof Error
        ? error
        : new Error("Помилка відправки форми");
    }
  }

  /**
   * Отримати всі альбоми галереї
   */
  async getAlbums(): Promise<GalleryAlbum[]> {
    try {
      // Використовуємо локальний API проксі замість прямого виклику бекенду
      const response = await fetch('/api/gallery');
      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Client: Albums data:', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('API Client: Failed to fetch albums:', error);
      // Fallback порожній масив
      return [];
    }
  }

  /**
   * Отримати альбом з фото за slug
   */
  async getAlbum(slug: string): Promise<GalleryResponse> {
    try {
      console.log('API Client: Fetching album:', slug);
      // Використовуємо локальний API проксі
      const response = await fetch(`/api/gallery?album=${slug}`);

      if (!response.ok) {
        console.error('API Client: Failed to fetch album, status:', response.status);
        throw new Error(`Failed to fetch album: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Client: Raw album data:', data);

      // Обробляємо фото - використовуємо правильне поле 'url' замість 'image'
      if (data.photos && Array.isArray(data.photos)) {
        console.log(`API Client: Processing ${data.photos.length} photos`);
        data.photos = data.photos.map((photo: any) => {
          // Якщо є поле 'url', використовуємо його як 'image' для сумісності
          if (photo.url && !photo.image) {
            photo.image = photo.url;
            console.log(`API Client: ✅ Photo ${photo.id} (${photo.title}): using URL field`);
          } else if (photo.image) {
            console.log(`API Client: ✅ Photo ${photo.id} (${photo.title}): already has image field`);
          } else {
            console.log(`API Client: ❌ Photo ${photo.id} (${photo.title}): no URL or image field`);
          }
          return photo;
        });
      }

      console.log('API Client: Processed album data:', data);
      return data;
    } catch (error) {
      console.error('API Client: Error fetching album:', error);
      // Fallback дані
      return {
        album: { id: 1, name: slug, slug, type: 'GENERAL' },
        photos: [],
        pairs: [],
        collections: []
      };
    }
  }

  /**
   * Отримати загальну галерею (general album)
   */
  async getGeneralGallery(): Promise<GalleryResponse> {
    return this.getAlbum('general');
  }

  /**
   * Отримати галерею Before/After
   */
  async getBeforeAfterGallery(): Promise<GalleryResponse> {
    return this.getAlbum('before-after');
  }
}

export const apiClient = new ApiClient();

