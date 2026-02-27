import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to localized string
 */
export function formatDate(dateString: string, locale: string = 'tr-TR'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format date as short format
 */
export function formatDateShort(dateString: string, locale: string = 'tr-TR'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(dateString: string, lang: string = 'tr'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const translations: Record<string, { justNow: string; minutesAgo: string; hoursAgo: string; daysAgo: string; weeksAgo: string }> = {
    tr: { justNow: 'Az önce', minutesAgo: 'dakika önce', hoursAgo: 'saat önce', daysAgo: 'gün önce', weeksAgo: 'hafta önce' },
    en: { justNow: 'Just now', minutesAgo: 'minutes ago', hoursAgo: 'hours ago', daysAgo: 'days ago', weeksAgo: 'weeks ago' },
    el: { justNow: 'Μόλις τώρα', minutesAgo: 'λεπτά πριν', hoursAgo: 'ώρες πριν', daysAgo: 'μέρες πριν', weeksAgo: 'εβδομάδες πριν' },
  };

  const t = translations[lang] || translations.tr;

  if (diffInSeconds < 60) {
    return t.justNow;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${t.minutesAgo}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${t.hoursAgo}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${t.daysAgo}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${t.weeksAgo}`;
  }

  return formatDateShort(dateString, lang);
}

// Alias for compatibility
export const formatDistanceToNow = getRelativeTime;

/**
 * Calculate reading time
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get featured image URL from embedded data
 */
export function getFeaturedImage(embedded: any): string | null {
  if (
    embedded &&
    embedded['wp:featuredmedia'] &&
    embedded['wp:featuredmedia'][0] &&
    embedded['wp:featuredmedia'][0].source_url
  ) {
    return embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

/**
 * Get author info from embedded data
 */
export function getAuthor(embedded: any): { name: string; avatar: string } | null {
  if (embedded && embedded.author && embedded.author[0]) {
    return {
      name: embedded.author[0].name,
      avatar: embedded.author[0].avatar_urls?.['96'] || '',
    };
  }
  return null;
}

/**
 * Get categories from embedded data
 */
export function getCategories(embedded: any): Array<{ id: number; name: string; slug: string }> {
  if (embedded && embedded['wp:term'] && embedded['wp:term'][0]) {
    return embedded['wp:term'][0].map((term: any) => ({
      id: term.id,
      name: term.name,
      slug: term.slug,
    }));
  }
  return [];
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

/**
 * Check if running on client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get URL query parameters
 */
export function getQueryParams(): URLSearchParams {
  if (isClient()) {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

/**
 * Scroll to element by ID
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Local storage helper with SSR support
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

/**
 * Share content to social media
 */
export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
}

export async function shareToSocialMedia(platform: string, options: ShareOptions): Promise<boolean> {
  const { title, text, url } = options;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text || title);

  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
  };

  // Use Web Share API if available (mobile)
  if (platform === 'native' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  }

  // Check if platform is supported
  const shareUrl = shareUrls[platform];
  if (!shareUrl) {
    console.error('Unsupported platform:', platform);
    return false;
  }

  // Open share dialog in new window
  if (platform === 'email') {
    window.location.href = shareUrl;
  } else {
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
  }

  return true;
}
