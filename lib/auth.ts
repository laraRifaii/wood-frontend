import { User } from '@/types';

// Mock user store — replace with DB in backend integration
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@woodco.com',
    password: 'admin123', // plain for demo; backend will use bcrypt
    name: 'Admin',
  },
];

const TOKEN_KEY = 'wood_admin_token';
const USER_KEY = 'wood_admin_user';

export function loginUser(email: string, password: string): { token: string; user: User } | null {
  const found = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!found) return null;
  const token = btoa(JSON.stringify({ id: found.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
  const user: User = { id: found.id, email: found.email, name: found.name };
  return { token, user };
}

export function saveAuth(token: string, user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuth(): { token: string | null; user: User | null } {
  if (typeof window === 'undefined') return { token: null, user: null };
  const token = localStorage.getItem(TOKEN_KEY);
  const userStr = localStorage.getItem(USER_KEY);
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
