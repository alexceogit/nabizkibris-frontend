import type { NextApiRequest, NextApiResponse } from 'next';

interface RSSItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  content?: string;
  author?: string;
  categories?: string[];
  enclosure?: {
    url: string;
    type: string;
  };
}

interface RSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  copyright: string;
  pubDate: string;
  lastBuildDate: string;
  items: RSSItem[];
}

const mockPosts = [
  {
    title: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler açıklandı',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    excerpt: 'Hükümetten ekonomi canlanması için yeni adımlar. İşte detaylar...',
    content: 'Hükümetten ekonomi canlanması için yeni adımlar...',
    date: '2024-02-15T10:00:00Z',
    category: 'Ekonomi',
    author: 'Ahmet Yılmaz',
    image: 'https://picsum.photos/800/600?random=1',
  },
  {
    title: 'Girne\'de yeni turizm sezonu hazırlıkları başladı',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    excerpt: 'Turizm sezonu öncesi Girne\'de hummalı hazırlıklar sürüyor.',
    content: 'Turizm sezonu öncesi Girne\'de hummalı hazırlıklar sürüyor.',
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

function generateRSS2(feed: RSSFeed): string {
  const siteUrl = 'https://nabizkibris.com';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title><![CDATA[${feed.title}]]></title>
    <description><![CDATA[${feed.description}]]></description>
    <link>${feed.link}</link>
    <language>${feed.language}</language>
    <copyright><![CDATA[${feed.copyright}]]></copyright>
    <pubDate>${feed.pubDate}</pubDate>
    <lastBuildDate>${feed.lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml" />
`;

  feed.items.forEach(item => {
    xml += `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
      <content:encoded><![CDATA[${item.content || item.description}]]></content:encoded>
      <dc:creator><![CDATA[${item.author || 'NabızKıbrıs'}]]></dc:creator>
`;
    if (item.categories) {
      item.categories.forEach(cat => {
        xml += `      <category><![CDATA[${cat}]]></category>
`;
      });
    }
    if (item.enclosure) {
      xml += `      <enclosure url="${item.enclosure.url}" type="${item.enclosure.type}" length="0" />
`;
    }
    xml += `    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang = 'tr' } = req.query;

  const siteUrl = 'https://nabizkibris.com';
  const feedUrl = `${siteUrl}/${lang}/rss`;

  const feed: RSSFeed = {
    title: lang === 'tr' ? 'NabızKıbrıs Haberleri' : lang === 'en' ? 'NabızKıbrıs News' : 'NabızKıbrıs Ειδήσεις',
    description: 'KKTC ve Kıbrıs haberlerinin nabzını tutan haber portalı',
    link: feedUrl,
    language: lang === 'tr' ? 'tr-tr' : lang === 'en' ? 'en-us' : 'el-gr',
    copyright: `© ${new Date().getFullYear()} NabızKıbrıs`,
    pubDate: new Date().toUTCString(),
    lastBuildDate: new Date().toUTCString(),
    items: mockPosts.map(post => ({
      title: post.title,
      link: `${siteUrl}/${lang}/${post.slug}`,
      guid: `${siteUrl}/${lang}/${post.slug}`,
      pubDate: new Date(post.date).toUTCString(),
      description: post.excerpt,
      content: `<p>${post.content}</p><p><img src="${post.image}" alt="${post.title}" /></p>`,
      author: post.author,
      categories: [post.category],
    })),
  };

  const xml = generateRSS2(feed);

  res.setHeader('Content-Type', 'application/rss+xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=1800');
  res.status(200).send(xml);
}
