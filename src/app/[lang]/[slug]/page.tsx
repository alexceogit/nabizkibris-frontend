import { WP_Post } from '@/types';

// Server-side data fetching for article
async function getWpPost(slug: string, lang: string = 'tr'): Promise<WP_Post | null> {
  try {
    const wpApiUrl = 'http://46.225.103.133/wp-json/wp/v2';
    const res = await fetch(`${wpApiUrl}/posts?slug=${slug}&_embed&lang=${lang}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.error('WP API error:', res.status);
      return null;
    }
    
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('WP fetch error:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, lang } = await params;
  const post = await getWpPost(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Haber Bulunamadı</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Aradığınız haber mevcut değil veya kaldırılmış olabilir.</p>
          <a href={`/${lang}`} className="text-primary hover:underline">
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  // Get featured image
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || `https://picsum.photos/1200/600?random=${post.id}`;
  
  // Get category
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  
  // Format date
  const date = new Date(post.date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <img 
          src={imageUrl} 
          alt={post.title.rendered}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            {category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-white rounded mb-4">
                {category.name}
              </span>
            )}
            <h1 
              className="text-2xl md:text-4xl font-bold text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          
          {/* Back Button */}
          <div className="mt-12 pt-8 border-t">
            <a 
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              ← Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
