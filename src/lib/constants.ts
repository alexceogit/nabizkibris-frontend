import { Language } from '@/types';

// API Configuration
export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://example.com/wp-json/wp/v2';
export const WORDPRESS_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'https://example.com/graphql';

// Site Configuration
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nabizkibris.com';
export const SITE_NAME = 'NabızKıbrıs';
export const SITE_DESCRIPTION = 'Haberin Nabzı, Geleceğin Medyası';

// Language Configuration
export const DEFAULT_LANGUAGE: Language = 'tr';
export const SUPPORTED_LANGUAGES: Language[] = ['tr', 'en', 'el'];

export const LANGUAGE_NAMES: Record<Language, string> = {
  tr: 'Türkçe',
  en: 'English',
  el: 'Ελληνικά',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  el: '🇬🇷',
};

// Pagination
export const POSTS_PER_PAGE = 12;
export const POSTS_PER_PAGE_HOME = 6;
export const POSTS_PER_PAGE_SEARCH = 10;

// Categories
export const DEFAULT_CATEGORY = 'genel';
export const BREAKING_NEWS_CATEGORY = 'son-dakika';

// Featured Posts
export const FEATURED_POSTS_LIMIT = 5;
export const BREAKING_NEWS_LIMIT = 3;

// Cache
export const API_CACHE_DURATION = 60 * 5; // 5 minutes in seconds
export const IMAGE_CACHE_DURATION = 60 * 60 * 24; // 24 hours

// Social Media
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/nabizkibris',
  twitter: 'https://twitter.com/nabizkibris',
  instagram: 'https://instagram.com/nabizkibris',
  telegram: 'https://t.me/nabizkibris',
  youtube: 'https://youtube.com/@nabizkibris',
};

// Analytics
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Date Formats
export const DATE_FORMATS = {
  short: 'dd MMM yyyy',
  long: 'dd MMMM yyyy HH:mm',
  time: 'HH:mm',
  full: 'EEEE, dd MMMM yyyy',
};
