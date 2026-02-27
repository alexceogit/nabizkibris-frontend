import axios from 'axios';
import { WP_Post, WP_Author, WP_Media, WP_Term } from '@/types';
import { POSTS_PER_PAGE, WORDPRESS_API_URL } from './constants';

const apiClient = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch posts from WordPress REST API
 */
export async function getPosts(params: {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  author?: number;
  search?: string;
  lang?: string;
  featured?: boolean;
  orderBy?: 'date' | 'title' | 'modified' | 'rand';
  order?: 'asc' | 'desc';
} = {}) {
  const {
    page = 1,
    perPage = POSTS_PER_PAGE,
    category,
    tag,
    author,
    search,
    lang,
    featured,
    orderBy = 'date',
    order = 'desc',
  } = params;

  const queryParams: Record<string, any> = {
    page,
    per_page: perPage,
    _embed: true,
    orderby: orderBy,
    order,
  };

  if (category) queryParams.categories = category;
  if (tag) queryParams.tags = tag;
  if (author) queryParams.author = author;
  if (search) queryParams.search = search;
  if (featured) queryParams.sticky = true;
  if (lang) queryParams.lang = lang;

  try {
    const response = await apiClient.get('/posts', { params: queryParams });
    return {
      data: response.data,
      total: parseInt(response.headers['x-wp-total'] || '0', 10),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0', 10),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: [], total: 0, totalPages: 0, currentPage: page };
  }
}

/**
 * Fetch single post by slug
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await apiClient.get('/posts', {
      params: {
        slug,
        _embed: true,
      },
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0] as WP_Post;
    }
    return null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Fetch post by ID
 */
export async function getPostById(id: number) {
  try {
    const response = await apiClient.get(`/posts/${id}`, {
      params: { _embed: true },
    });
    return response.data as WP_Post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

/**
 * Fetch categories
 */
export async function getCategories(params: { parent?: number; hideEmpty?: boolean } = {}) {
  const { parent, hideEmpty = false } = params;

  try {
    const response = await apiClient.get('/categories', {
      params: {
        parent,
        hide_empty: hideEmpty,
        per_page: 100,
      },
    });
    return response.data as WP_Term[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch tags
 */
export async function getTags(params: { hideEmpty?: boolean; search?: string } = {}) {
  const { hideEmpty = false, search } = params;

  try {
    const response = await apiClient.get('/tags', {
      params: {
        hide_empty: hideEmpty,
        search,
        per_page: 50,
      },
    });
    return response.data as WP_Term[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Fetch authors
 */
export async function getAuthors() {
  try {
    const response = await apiClient.get('/users', {
      params: {
        per_page: 100,
      },
    });
    return response.data as WP_Author[];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

/**
 * Fetch featured media by ID
 */
export async function getMediaById(id: number) {
  try {
    const response = await apiClient.get(`/media/${id}`);
    return response.data as WP_Media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

/**
 * Search posts
 */
export async function searchPosts(query: string, lang?: string) {
  try {
    const response = await apiClient.get('/posts', {
      params: {
        search: query,
        _embed: true,
        per_page: 10,
        lang,
      },
    });
    return response.data as WP_Post[];
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 5) {
  return getPosts({
    perPage: limit,
    orderBy: 'date',
    order: 'desc',
  });
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug: string, page: number = 1) {
  return getPosts({
    category: categorySlug,
    page,
    perPage: POSTS_PER_PAGE,
  });
}

/**
 * Get breaking news posts
 */
export async function getBreakingNews(limit: number = 3) {
  // Assuming there's a category with slug 'son-dakika' for breaking news
  return getPosts({
    category: 'son-dakika',
    perPage: limit,
    orderBy: 'date',
    order: 'desc',
  });
}

export default apiClient;
