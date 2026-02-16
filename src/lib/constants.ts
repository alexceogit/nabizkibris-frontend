import { Language as LanguageType } from '../types';
export type Language = LanguageType;

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

// Static Content Translations
export const TRANSLATIONS = {
  tr: {
    // Header
    searchPlaceholder: 'Haber ara...',
    search: 'Ara',
    language: 'Dil',
    darkMode: 'Karanlık Mod',
    lightMode: 'Aydınlık Mod',
    menu: 'Menü',
    close: 'Kapat',
    
    // Navigation
    home: 'Ana Sayfa',
    allNews: 'Tüm Haberler',
    breakingNews: 'Son Dakika',
    columns: 'Köşe Yazıları',
    about: 'Hakkımızda',
    
    // Footer
    quickLinks: 'Hızlı Linkler',
    corporate: 'Kurumsal',
    allRightsReserved: 'Tüm hakları saklıdır.',
    madeWith: 'Made with 🧠 for KKTC',
    
    // Mobile Menu
    categories: 'Kategoriler',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    
    // Article
    readTime: 'dk okuma',
    backToHome: 'Ana Sayfaya Dön',
    tags: 'Etiketler',
    noArticle: 'Haber Bulunamadı',
    noArticleDesc: 'Aradığınız haber mevcut değil veya kaldırılmış olabilir.',
  },
  en: {
    searchPlaceholder: 'Search news...',
    search: 'Search',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    menu: 'Menu',
    close: 'Close',
    
    home: 'Home',
    allNews: 'All News',
    breakingNews: 'Breaking News',
    columns: 'Columns',
    about: 'About',
    
    quickLinks: 'Quick Links',
    corporate: 'Corporate',
    allRightsReserved: 'All rights reserved.',
    madeWith: 'Made with 🧠 for KKTC',
    
    categories: 'Categories',
    login: 'Sign In',
    register: 'Sign Up',
    
    readTime: 'min read',
    backToHome: 'Back to Home',
    tags: 'Tags',
    noArticle: 'Article Not Found',
    noArticleDesc: 'The article you are looking for does not exist or has been removed.',
  },
  el: {
    searchPlaceholder: 'Αναζήτηση ειδήσεων...',
    search: 'Αναζήτηση',
    language: 'Γλώσσα',
    darkMode: 'Σκοτεινή Λειτουργία',
    lightMode: 'Φωτεινή Λειτουργία',
    menu: 'Μενού',
    close: 'Κλείσιμο',
    
    home: 'Αρχική',
    allNews: 'Όλες οι Ειδήσεις',
    breakingNews: 'Τελευταία Νέα',
    columns: 'Στήλες',
    about: 'Σχετικά',
    
    quickLinks: 'Γρήγοροι Σύνδεσμοι',
    corporate: 'Εταιρικά',
    allRightsReserved: 'Όλα τα δικαιώματα διατηρούνται.',
    madeWith: 'Made with 🧠 for KKTC',
    
    categories: 'Κατηγορίες',
    login: 'Σύνδεση',
    register: 'Εγγραφή',
    
    readTime: 'λεπτά ανάγνωση',
    backToHome: 'Επιστροφή στην Αρχική',
    tags: 'Ετικέτες',
    noArticle: 'Δεν βρέθηκε Άρθρο',
    noArticleDesc: 'Το άρθρο που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.tr;
