import axios from 'axios';
import { HeroContent, WoodType, GalleryImage, TextSection, AdvantagesSection } from '@/types';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

const serverApi = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: NO_CACHE_HEADERS,
});

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const { data } = await serverApi.get<T>(endpoint, {
      headers: NO_CACHE_HEADERS,
      params: { _t: Date.now() }, // cache-busting timestamp
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      throw new Error(`[${status}] ${endpoint}: ${message}`);
    }
    throw new Error(`Failed to fetch ${endpoint}: ${String(error)}`);
  }
}

export const getHero = () => fetchFromApi<HeroContent>('/hero');
export const getWoodTypes = () => fetchFromApi<WoodType[]>('/wood-types');
export const getGallery = () => fetchFromApi<GalleryImage[]>('/gallery');
export const getAbout = () => fetchFromApi<TextSection>('/about');
export const getAdvantages = () => fetchFromApi<AdvantagesSection>('/advantages');