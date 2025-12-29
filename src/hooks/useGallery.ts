import { useState, useEffect } from 'react';
import { apiClient } from '@/api/client';

type GalleryAlbum = {
  id: number;
  name: string;
  slug: string;
  type: 'GENERAL' | 'BEFORE_AFTER';
};

type GalleryPhoto = {
  id: number;
  image: string;
  title?: string;
  description?: string;
  albumId: number;
  width?: number;
  height?: number;
};

type GalleryPair = {
  id: number;
  beforePhoto: GalleryPhoto;
  afterPhoto: GalleryPhoto;
  label?: string;
};

/**
 * Хук для отримання списку альбомів галереї
 */
export const useGallery = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        console.log('useGallery: Fetching albums...');
        const data = await apiClient.getAlbums();
        console.log('useGallery: Albums received:', data);
        setAlbums(data);
      } catch (err) {
        console.error('useGallery: Error fetching albums:', err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, loading, error };
};

/**
 * Хук для отримання загальної галереї (general album)
 */
export const useGeneralGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log('useGeneralGallery: Fetching general gallery...');
        const data = await apiClient.getGeneralGallery();
        console.log('useGeneralGallery: Data received:', data);
        setPhotos(data.photos || []);
      } catch (err) {
        console.error('useGeneralGallery: Error fetching photos:', err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

/**
 * Хук для отримання галереї Before/After
 */
export const useBeforeAfterGallery = () => {
  const [pairs, setPairs] = useState<GalleryPair[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        console.log('useBeforeAfterGallery: Fetching before-after gallery data...');
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'using fallback');

        const data = await apiClient.getBeforeAfterGallery();
        console.log('useBeforeAfterGallery: API response:', data);
        console.log('Pairs count:', data.pairs?.length || 0);
        console.log('Photos count:', data.photos?.length || 0);
        console.log('Collections count:', data.collections?.length || 0);

        setPairs(data.pairs || []);
        setPhotos(data.photos || []);
      } catch (err) {
        console.error('useBeforeAfterGallery: Error fetching before-after gallery:', err);
        console.error('Error details:', {
          message: err instanceof Error ? err.message : "Unknown error",
          stack: err instanceof Error ? err.stack : undefined,
        });
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPairs();
  }, []);

  return { pairs, photos, loading, error };
};
