interface HreflangProps {
  lang: string;
  slug?: string;
  alternates?: Array<{ lang: string; href: string }>;
}

export function generateHreflangAlternates(lang: string, slug?: string): Array<{ lang: string; href: string }> {
  const baseUrl = 'https://nabizkibris.com';
  const supportedLangs = ['tr', 'en', 'el'];
  
  return supportedLangs
    .filter(l => l !== lang)
    .map(l => ({
      lang: l,
      href: slug ? `${baseUrl}/${l}/${slug}` : `${baseUrl}/${l}`,
    }));
}

export function HreflangTags({ lang, slug }: HreflangProps) {
  const alternates = generateHreflangAlternates(lang, slug);
  const baseUrl = 'https://nabizkibris.com';
  const selfUrl = slug ? `${baseUrl}/${lang}/${slug}` : `${baseUrl}/${lang}`;

  return (
    <>
      {/* Self-referencing canonical */}
      <link rel="canonical" href={selfUrl} />
      
      {/* x-default */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/tr`} 
      />
      
      {/* Turkish */}
      <link 
        rel="alternate" 
        hrefLang="tr" 
        href={slug ? `${baseUrl}/tr/${slug}` : `${baseUrl}/tr`} 
      />
      
      {/* English */}
      <link 
        rel="alternate" 
        hrefLang="en" 
        href={slug ? `${baseUrl}/en/${slug}` : `${baseUrl}/en`} 
      />
      
      {/* Greek */}
      <link 
        rel="alternate" 
        hrefLang="el" 
        href={slug ? `${baseUrl}/el/${slug}` : `${baseUrl}/el`} 
      />
      
      {/* Alternate links for other languages */}
      {alternates.map((alt) => (
        <link
          key={alt.lang}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.href}
        />
      ))}
    </>
  );
}

// For homepage/generic pages without slug
export function HreflangHome({ lang }: { lang: string }) {
  const baseUrl = 'https://nabizkibris.com';

  return (
    <>
      <link rel="canonical" href={`${baseUrl}/${lang}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/tr`} />
      <link rel="alternate" hrefLang="tr" href={`${baseUrl}/tr`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="el" href={`${baseUrl}/el`} />
    </>
  );
}
