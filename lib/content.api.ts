import api from './api';
import { defaultContent } from './content';
import axios from 'axios';

// Server components use this — not NEXT_PUBLIC
const serverApi = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});

export async function getHero() {
  try {
    const { data } = await api.get('/hero');
    return data;
  } catch {
    return defaultContent.hero;
  }
}

export async function getWoodTypes() {
  const { data } = await serverApi.get('/wood-types');
  return data;
}

export async function getGallery() {
  try {
    const { data } = await api.get('/gallery');
    return data;
  } catch {
    return defaultContent.gallery;
  }
}

export async function getAbout() {
  try {
    const { data } = await api.get('/about');
    return data;
  } catch {
    return defaultContent.aboutSection;
  }
}

export async function getAdvantages() {
  try {
    const { data } = await api.get('/advantages');
    return data;
  } catch {
    return defaultContent.advantagesSection;
  }
}