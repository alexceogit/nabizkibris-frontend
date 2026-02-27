import { WP_Post } from '@/types';
import HomeClient from './HomeClient';

// Server-side data fetching with ISR
async function getWpPosts(lang: string = 'tr'): Promise<WP_Post[]> {
  try {
    const wpApiUrl = 'http://46.225.103.133/wp-json/wp/v2';
    const res = await fetch(`${wpApiUrl}/posts?per_page=10&_embed&lang=${lang}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!res.ok) {
      console.error('WP API error:', res.status);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    return [];
  }
}

interface PageProps {
  params: { lang: string };
}

export default async function HomePage({ params }: PageProps) {
  // Server-side fetch with language parameter
  const wpPosts = await getWpPosts(params.lang);
  
  return <HomeClient initialPosts={wpPosts} lang={params.lang} />;
}
