import type { Language } from './translations';

export interface FireInputs {
  target: number;
  current: number;
  monthlyContribution: number;
  annualBonus: number;
  annualReturn: number;
  fireRatio: number;
}

const STORAGE_KEY = 'eazy-fire-inputs';
const LANGUAGE_KEY = 'eazy-fire-language';

export function saveInputsToStorage(inputs: FireInputs): void {
  try {
    const data = JSON.stringify(inputs);
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(data)}; max-age=${60 * 60 * 24 * 365}; path=/`;
  } catch (error) {
    console.warn('Failed to save inputs to storage:', error);
  }
}

export function loadInputsFromStorage(): Partial<FireInputs> | null {
  try {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${STORAGE_KEY}=`));
    
    if (!cookie) return null;
    
    const value = cookie.split('=')[1];
    if (!value) return null;
    
    const data = decodeURIComponent(value);
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to load inputs from storage:', error);
    return null;
  }
}

export function saveLanguageToStorage(language: Language): void {
  try {
    document.cookie = `${LANGUAGE_KEY}=${language}; max-age=${60 * 60 * 24 * 365}; path=/`;
  } catch (error) {
    console.warn('Failed to save language to storage:', error);
  }
}

export function loadLanguageFromStorage(): Language {
  try {
    if (typeof document === 'undefined') return 'CN';
    
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${LANGUAGE_KEY}=`));
    
    if (!cookie) return 'CN';
    
    const value = cookie.split('=')[1];
    return (value === 'EN' ? 'EN' : 'CN') as Language;
  } catch (error) {
    console.warn('Failed to load language from storage:', error);
    return 'CN';
  }
}