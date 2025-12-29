import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

const API_BASE_URL = '';

export function useApiData<T>(
  endpoint: string,
  fallbackData: T
): ApiResponse<T> {
  // Ініціалізуємо з fallback даними одразу (без skeleton)
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`useApiData: Making request to /api${endpoint}`);
        const response = await fetch(`/api${endpoint}`);
        console.log(`useApiData: Response status for ${endpoint}:`, response.status);

        if (!response.ok) {
          console.error(`useApiData: API request failed for ${endpoint}:`, response.status, response.statusText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(`useApiData: Received data from ${endpoint}:`, result);

        // Зливаємо API дані з fallback даними для консистентності
        // Виключаємо null/undefined значення з API відповіді
        const cleanResult = Object.fromEntries(
          Object.entries(result).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );
        const mergedData = { ...fallbackData, ...cleanResult };
        console.log(`useApiData: Cleaned API result:`, cleanResult);
        console.log(`useApiData: Merged data for ${endpoint}:`, mergedData);

        // Для сервісів перевіряємо структуру
        if (endpoint === '/services') {
          const servicesData = mergedData as any;
          console.log(`useApiData: Services data structure check:`, {
            hasServices: !!servicesData.services,
            servicesCount: Array.isArray(servicesData.services) ? servicesData.services.length : 0,
            firstService: Array.isArray(servicesData.services) ? servicesData.services[0] || null : null,
            fullData: mergedData,
          });
        }

        // Перевіряємо, чи змінились дані, щоб уникнути зайвих перерендерів
        setData(prevData => {
          if (JSON.stringify(prevData) !== JSON.stringify(mergedData)) {
            return mergedData;
          }
          return prevData;
        });
      } catch (err) {
        console.error(`❌ useApiData: Failed to fetch data from ${endpoint}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback дані вже встановлені, нічого не змінюємо
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Вилучили fallbackData з залежностей, щоб уникнути зациклення

  return {
    data,
    loading,
    error,
    hasData: true // Завжди true, бо fallback дані завжди є
  };
}

// Типи для різних секцій
export interface HeroData {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundImagePublicId?: string;
}

export interface AboutData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  imagePublicId?: string;
}

export interface SpecializationData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  imagePublicId?: string;
}

export interface SubService {
  id?: number;
  name: string;
  price: string;
  description?: string;
}

export interface Service {
  id: number;
  name: string;
  price?: string;
  description?: string;
  subServices?: SubService[];
}

export interface ServicesData {
  services: Service[];
}

export interface GalleryAlbum {
  id: number;
  name: string;
  slug: string;
  type: 'GENERAL' | 'BEFORE_AFTER';
}

export interface GalleryPhoto {
  id: number;
  albumId: number;
  title?: string;
  description?: string;
  image: string;
  imagePublicId: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
}

// Тип для відповіді API галереї
interface GalleryApiResponse {
  album?: GalleryAlbum;
  photos?: GalleryPhoto[];
  pairs?: any[];
  collections?: any[];
  // Альтернативні поля на випадок іншої структури
  images?: GalleryPhoto[];
  data?: GalleryPhoto[];
}

// Статичні fallback дані для галереї (за межами компонента для стабільності)
const galleryFallbackData: GalleryApiResponse = {
  album: { id: 1, name: "Gallery", slug: "gallery", type: "GENERAL" },
  photos: [],
  pairs: [],
  collections: []
};

// Альтернативний підхід - отримуємо всі альбоми спочатку
const albumsFallbackData: GalleryAlbum[] = [
  { id: 1, name: "General", slug: "general", type: "GENERAL" },
  { id: 2, name: "Before & After", slug: "before-after", type: "BEFORE_AFTER" }
];

// Допоміжний хук для отримання фото з галереї
export function useGalleryData() {
  // Спочатку отримуємо список альбомів
  const { data: albums, loading: albumsLoading, error: albumsError } = useApiData<GalleryAlbum[]>("/gallery/albums", albumsFallbackData);

  const [allPhotos, setAllPhotos] = useState<GalleryPhoto[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      if (!albums || albums.length === 0) {
        setAllPhotos([]);
        return;
      }

      setPhotosLoading(true);

      try {
        const photosPromises = albums.map(async (album) => {
          try {
            const response = await fetch(`${API_BASE_URL}/public/gallery/albums/${album.slug}`);

            if (!response.ok) {
              return [];
            }

            const albumData = await response.json();

            // Спробуємо витягнути фото
            let photos: GalleryPhoto[] = [];
            if (albumData.photos && Array.isArray(albumData.photos)) {
              photos = albumData.photos;
            } else if (albumData.images && Array.isArray(albumData.images)) {
              photos = albumData.images;
            } else if (albumData.data && Array.isArray(albumData.data)) {
              photos = albumData.data;
            } else if (Array.isArray(albumData)) {
              photos = albumData;
            }

            return photos;
          } catch (error) {
            return [];
          }
        });

        const photosArrays = await Promise.all(photosPromises);
        const allPhotosFlat = photosArrays.flat();

        setAllPhotos(allPhotosFlat);
      } catch (error) {
        setAllPhotos([]);
      } finally {
        setPhotosLoading(false);
      }
    };

    fetchAllPhotos();
  }, [albums]);

  const loading = albumsLoading || photosLoading;
  const error = albumsError;

  return {
    albums: albums || [],
    photos: allPhotos,
    loading,
    error,
    hasPhotos: allPhotos.length > 0
  };
}
