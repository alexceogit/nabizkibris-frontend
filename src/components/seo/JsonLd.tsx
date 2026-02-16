import type { WP_Post } from '@/types';

interface ArticleJsonLdProps {
  post: WP_Post;
  siteUrl?: string;
}

export function ArticleJsonLd({ post, siteUrl = 'https://nabizkibris.com' }: ArticleJsonLdProps) {
  // Extract plain text from title and excerpt
  const titleText = post.title?.rendered 
    ? post.title.rendered.replace(/<[^>]*>/g, '')
    : '';
  
  const excerptText = post.excerpt?.rendered 
    ? post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    : '';

  // Get featured image
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

  // Get author name
  const authorName = post._embedded?.author?.[0]?.name || 'NabızKıbrıs';
  const authorUrl = post._embedded?.author?.[0]?.link || siteUrl;

  // Get category name
  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Haber';

  // Generate schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: titleText,
    description: excerptText,
    image: featuredImage ? [featuredImage] : [],
    datePublished: post.date_gmt || post.date,
    dateModified: post.modified_gmt || post.modified,
    author: [{
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'NabızKıbrıs',
      logo: {
        '@type': 'ImageObject',
        url: siteUrl + '/icon-192.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl + '/' + post.slug,
    },
    articleSection: categoryName,
    keywords: post.tags?.map((t: any) => t.name).join(', ') || '',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// WebSite JSON-LD for search
interface WebsiteJsonLdProps {
  siteUrl?: string;
  searchUrl?: string;
}

export function WebsiteJsonLd({ 
  siteUrl = 'https://nabizkibris.com',
  searchUrl = 'https://nabizkibris.com/tr/ara'
}: WebsiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NabızKıbrıs',
    url: siteUrl,
    description: 'KKTC ve Kıbrıs haberlerin nabzını tutan haber portalı',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl + '?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Organization JSON-LD
interface OrganizationJsonLdProps {
  siteUrl?: string;
  logoUrl?: string;
}

export function OrganizationJsonLd({ 
  siteUrl = 'https://nabizkibris.com',
  logoUrl = siteUrl + '/icon-192.png'
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NabızKıbrıs',
    url: siteUrl,
    logo: logoUrl,
    sameAs: [
      'https://facebook.com/nabizkibris',
      'https://twitter.com/nabizkibris',
      'https://instagram.com/nabizkibris',
      'https://t.me/nabizkibris',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Breadcrumb JSON-LD
interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
