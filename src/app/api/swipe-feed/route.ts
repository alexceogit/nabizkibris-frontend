import { NextRequest, NextResponse } from 'next/server';

// Server-side WordPress fetch
const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://46.225.103.133/wp-json/wp/v2';

interface SwipeNews {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'tr';
  
  try {
    // Fetch posts from WordPress with embedded media and terms
    const res = await fetch(`${WP_API}/posts?per_page=20&_embed=true&lang=${lang}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress', details: res.statusText },
        { status: res.status }
      );
    }
    
    const posts = await res.json();
    
    // Transform posts into SwipeNews format
    const swipeNews: SwipeNews[] = posts.map((post: any) => {
      // Extract featured image
      let image = '/placeholder.jpg';
      if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        image = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Extract category
      let category = 'Haber';
      if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
        category = post._embedded['wp:term'][0][0].name;
      }
      
      // Clean excerpt (remove HTML tags)
      const excerpt = post.excerpt?.rendered 
        ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
        : '';
      
      // Clean title (remove HTML tags)
      const title = post.title?.rendered 
        ? post.title.rendered.replace(/<[^>]*>/g, '').trim()
        : '';
      
      return {
        id: post.id,
        title,
        excerpt: excerpt.slice(0, 150) + (excerpt.length > 150 ? '...' : ''),
        image,
        category,
        date: post.date,
        slug: post.slug,
      };
    });
    
    return NextResponse.json(swipeNews);
  } catch (error) {
    console.error('Swipe feed error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
