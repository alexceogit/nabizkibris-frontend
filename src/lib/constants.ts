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
    
    // Homepage
    gundem: 'Gündem',
    sonHaberler: 'Son Haberler',
    populerHaberler: 'Popüler Haberler',
    tumunuGoster: 'Tümünü Göster',
    devami: 'Devamı',
    videoNews: 'Video Haberler',
    videoGallery: 'Video Galeri',
    allVideos: 'Tüm Videolar',
    viewAll: 'Tümü',
    
    // Time
    justNow: 'Az önce',
    hoursAgo: 'saat önce',
    minutesAgo: 'dakika önce',
    daysAgo: 'gün önce',
    
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
    comments: 'Yorumlar',
    writeComment: 'Yorum Yazın',
    yourName: 'Adınız *',
    emailNote: 'E-posta (yayınlanmaz)',
    yourComment: 'Yorumunuz...',
    sendComment: 'Yorum Gönder',
    sending: 'Gönderiliyor...',
    newest: 'En Yeni',
    mostLiked: 'En Beğenilen',
    like: 'Beğen',
    reply: 'Yanıtla',
    report: 'Şikayet',
    yourReply: 'Yanıtınız...',
    noComments: 'Henüz yorum yapılmamış.',
    recentComments: 'Son Yorumlar',
    viewAllComments: 'Tüm Yorumları Göster',
    noArticle: 'Haber Bulunamadı',
    noArticleDesc: 'Aradığınız haber mevcut değil veya kaldırılmış olabilir.',
    
    // Ticker
    tickerSpeed: 'Ticker Hızı',
    yavas: 'Yavaş',
    normal: 'Normal',
    hizli: 'Hızlı',
    kapat: 'Kapat',
    
    // Categories
    ekonomi: 'Ekonomi',
    spor: 'Spor',
    politika: 'Politika',
    turizm: 'Turizm',
    teknoloji: 'Teknoloji',
    saglik: 'Sağlık',
    egitim: 'Eğitim',
    kultur: 'Kültür',
    dunya: 'Dünya',
    magazin: 'Magazin',
    guncel: 'Güncel',
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
    
    // Homepage
    gundem: 'Agenda',
    sonHaberler: 'Latest News',
    populerHaberler: 'Popular News',
    tumunuGoster: 'View All',
    devami: 'Read More',
    videoNews: 'Video News',
    videoGallery: 'Video Gallery',
    allVideos: 'All Videos',
    viewAll: 'View All',
    
    // Time
    hoursAgo: 'hours ago',
    minutesAgo: 'minutes ago',
    daysAgo: 'days ago',
    
    // Footer
    quickLinks: 'Quick Links',
    corporate: 'Corporate',
    allRightsReserved: 'All rights reserved.',
    madeWith: 'Made with 🧠 for KKTC',
    
    // Mobile Menu
    categories: 'Categories',
    login: 'Sign In',
    register: 'Sign Up',
    
    // Article
    readTime: 'min read',
    backToHome: 'Back to Home',
    tags: 'Tags',
    comments: 'Comments',
    writeComment: 'Write a Comment',
    yourName: 'Your Name *',
    emailNote: 'Email (will not be published)',
    yourComment: 'Your comment...',
    sendComment: 'Submit Comment',
    sending: 'Sending...',
    newest: 'Newest',
    mostLiked: 'Most Liked',
    like: 'Like',
    reply: 'Reply',
    report: 'Report',
    yourReply: 'Your reply...',
    noComments: 'No comments yet. Be the first!',
    recentComments: 'Recent Comments',
    viewAllComments: 'View All Comments',
    noArticle: 'Article Not Found',
    noArticleDesc: 'The article you are looking for does not exist or has been removed.',
    
    // Ticker
    tickerSpeed: 'Ticker Speed',
    yavas: 'Slow',
    normal: 'Normal',
    hizli: 'Fast',
    kapat: 'Close',
    
    // Time
    justNow: 'Just now',
    
    // Categories
    ekonomi: 'Economy',
    spor: 'Sports',
    politika: 'Politics',
    turizm: 'Tourism',
    teknoloji: 'Technology',
    saglik: 'Health',
    egitim: 'Education',
    kultur: 'Culture',
    dunya: 'World',
    magazin: 'Magazine',
    guncel: 'Current',
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
    
    // Homepage
    gundem: 'Ατζέντα',
    sonHaberler: 'Τελευταίες Ειδήσεις',
    populerHaberler: 'Δημοφιλή Νέα',
    tumunuGoster: 'Προβολή Όλων',
    devami: 'Διαβάστε Περισσότερα',
    videoNews: 'Βίντεο Ειδήσεις',
    videoGallery: 'Βίντεο Γκαλερί',
    allVideos: 'Όλα τα Βίντεο',
    viewAll: 'Προβολή Όλων',
    
    // Time
    hoursAgo: 'ώρες πριν',
    minutesAgo: 'λεπτά πριν',
    daysAgo: 'μέρες πριν',
    
    // Footer
    quickLinks: 'Γρήγοροι Σύνδεσμοι',
    corporate: 'Εταιρικά',
    allRightsReserved: 'Όλα τα δικαιώματα διατηρούνται.',
    madeWith: 'Made with 🧠 for KKTC',
    
    // Mobile Menu
    categories: 'Κατηγορίες',
    login: 'Σύνδεση',
    register: 'Εγγραφή',
    
    // Article
    readTime: 'λεπτά ανάγνωση',
    backToHome: 'Επιστροφή στην Αρχική',
    tags: 'Ετικέτες',
    comments: 'Σχόλια',
    writeComment: 'Γράψτε Σχόλιο',
    yourName: 'Το όνομά σας *',
    emailNote: 'Email (δεν θα δημοσιευθεί)',
    yourComment: 'Το σχόλιό σας...',
    sendComment: 'Υποβολή Σχολίου',
    sending: 'Αποστολή...',
    newest: 'Νεότερα',
    mostLiked: 'Δημοφιλέστερα',
    like: 'Μου αρέσει',
    reply: 'Απάντηση',
    report: 'Αναφορά',
    yourReply: 'Η απάντησή σας...',
    noComments: 'Δεν υπάρχουν ακόμη σχόλια. Γίνετε ο πρώτος!',
    recentComments: 'Πρόσφατα Σχόλια',
    viewAllComments: 'Προβολή Όλων των Σχολίων',
    noArticle: 'Δεν βρέθηκε Άρθρο',
    noArticleDesc: 'Το άρθρο που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.',
    
    // Ticker
    tickerSpeed: 'Ταχύτητα Ticker',
    yavas: 'Αργή',
    normal: 'Κανονική',
    hizli: 'Γρήγορη',
    kapat: 'Κλείσιμο',
    
    // Time
    justNow: 'Μόλις τώρα',
    
    // Categories
    ekonomi: 'Οικονομία',
    spor: 'Αθλητικά',
    politika: 'Πολιτική',
    turizm: 'Τουρισμός',
    teknoloji: 'Τεχνολογία',
    saglik: 'Υγεία',
    egitim: 'Εκπαίδευση',
    kultur: 'Πολιτισμός',
    dunya: 'Κόσμος',
    magazin: 'Περιοδικό',
    guncel: 'Τρέχοντα',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.tr;
