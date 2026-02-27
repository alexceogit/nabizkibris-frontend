import { NextRequest, NextResponse } from 'next/server';

// Server-side WordPress fetch - avoids CORS issues
const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://46.225.103.133/wp-json/wp/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'tr';
  
  try {
    // Fetch all categories from WordPress
    const res = await fetch(`${WP_API}/categories?per_page=100&hide_empty=true&lang=${lang}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories from WordPress' },
        { status: res.status }
      );
    }
    
    const categories = await res.json();
    
    // Build category tree with parent/child relationships
    const categoryMap = new Map();
    const rootCategories: any[] = [];
    
    // First pass: create map
    categories.forEach((cat: any) => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        parent: cat.parent,
        count: cat.count,
        description: cat.description,
      });
    });
    
    // Second pass: build tree
    categories.forEach((cat: any) => {
      const category = categoryMap.get(cat.id);
      if (cat.parent && categoryMap.has(cat.parent)) {
        const parent = categoryMap.get(cat.parent);
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(category);
      } else {
        rootCategories.push(category);
      }
    });
    
    return NextResponse.json(rootCategories);
  } catch (error) {
    console.error('WordPress categories fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
