// WordPress API Types
export interface WP_Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: 'standard' | 'aside' | 'gallery' | 'video' | 'audio' | 'image' | 'quote' | 'link';
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  _embedded?: WP_Embedded;
}

export interface WP_Embedded {
  author?: WP_Author[];
  'wp:featuredmedia'?: WP_Media[];
  'wp:term'?: Array<Array<WP_Term>>;
  replies?: Array<WP_Comment[]>;
}

export interface WP_Author {
  id?: number;
  name?: string;
  url?: string;
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: Record<string, string>;
}

export interface WP_Media {
  id?: number;
  date?: string;
  guid?: { rendered: string };
  slug?: string;
  type?: string;
  link?: string;
  title?: { rendered: string };
  author?: number;
  caption?: { rendered: string };
  alt_text?: string;
  media_type?: 'image' | 'video' | 'application' | 'audio' | 'attachment';
  mime_type?: string;
  media_details?: {
    width?: number;
    height?: number;
    file?: string;
    sizes?: Record<string, { file: string; width: number; height: number; mime_type: string; source_url: string }>;
  };
  source_url?: string;
}

export interface WP_Term {
  id?: number;
  count?: number;
  description?: string;
  link?: string;
  name?: string;
  slug?: string;
  taxonomy?: 'category' | 'post_tag' | 'nav_menu' | 'link_category' | 'custom_taxonomy';
}

export interface WP_Category extends WP_Term {
  taxonomy: 'category';
}

export interface WP_Tag extends WP_Term {
  taxonomy: 'post_tag';
}

// News Types (Custom)
export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  formattedDate: string;
  author: Author;
  featuredImage: string | null;
  categories: Category[];
  tags: Tag[];
  featured: boolean;
  breaking: boolean;
  readingTime: number;
}

export interface Author {
  id: number;
  name: string;
  description: string;
  avatar: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  headers: Record<string, string>;
}

export interface SearchResult {
  id: number;
  type: string;
  subtype: string;
  url: string;
  title: string;
  excerpt: string;
}

// Language Types
export type Language = 'tr' | 'en' | 'el';

export interface LocalizedContent {
  tr: string;
  en: string;
  el: string;
}

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string;
  roles: string[];
}

export interface UserPreferences {
  darkMode: boolean;
  language: Language;
  notifications: boolean;
  savedArticles: number[];
}
