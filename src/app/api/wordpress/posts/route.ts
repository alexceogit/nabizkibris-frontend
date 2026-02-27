import { NextRequest, NextResponse } from 'next/server';

// Server-side WordPress fetch - avoids CORS issues
const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://46.225.103.133/wp-json/wp/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'tr';
  
  try {
    const res = await fetch(`${WP_API}/posts?per_page=10&_embed=true&lang=${lang}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WordPress fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
