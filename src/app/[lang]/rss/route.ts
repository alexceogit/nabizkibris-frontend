import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { lang?: string } }
) {
  const lang = params?.lang || 'tr';
  
  const siteUrl = 'https://nabizkibris.com';
  const feedUrl = `${siteUrl}/${lang}/rss`;

  const mockPosts = [
    {
      title: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler açıklandı',
      slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
      excerpt: 'Hükümetten ekonomi canlanması için yeni adımlar.',
      content: 'Hükümetten ekonomi canlanması için yeni adımlar.',
      date: '2024-02-15T10:00:00Z',
      category: 'Ekonomi',
      author: 'Ahmet Yılmaz',
      image: 'https://picsum.photos/800/600?random=1',
    },
    {
      title: 'Girne\'de yeni turizm sezonu hazırlıkları başladı',
      slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
      excerpt: 'Turizm sezonu öncesinde Girne\'de hummalı hazırlıklar sürüyor.',
      content: 'Turizm sezonu öncesinde Girne\'de hummalı hazırlıklar sürüyor.',
      date: '2024-02-14T09:00:00Z',
      category: 'Turizm',
      author: 'Ayşe Demir',
      image: 'https://picsum.photos/800/600?random=2',
    },
    {
      title: 'Yerel seçimler için adaylar belli oldu',
      slug: 'yerel-secimler-icin-adaylar-belli-oldu',
      excerpt: 'Yaklaşan yerel seçimlerde partiler adaylarını açıkladı.',
      content: 'Yaklaşan yerel seçimlerde partiler adaylarını açıkladı.',
      date: '2024-02-13T08:00:00Z',
      category: 'Politika',
      author: 'Mehmet Kaya',
      image: 'https://picsum.photos/800/600?random=3',
    },
  ];

  const feedTitle = lang === 'tr' ? 'NabızKıbrıs Haberleri' : lang === 'en' ? 'NabızKıbrıs News' : 'NabızKıbrıs Ειδήσεις';
  const feedLanguage = lang === 'tr' ? 'tr-tr' : lang === 'en' ? 'en-us' : 'el-gr';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${feedTitle}]]></title>
    <description><![CDATA[KKTC ve Kıbrıs haberlerinin nabzını tutan haber portalı]]></description>
    <link>${feedUrl}</link>
    <language>${feedLanguage}</language>
    <copyright>© ${new Date().getFullYear()} NabızKıbrıs</copyright>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${mockPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/${lang}/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/${lang}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      <category><![CDATA[${post.category}]]></category>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
