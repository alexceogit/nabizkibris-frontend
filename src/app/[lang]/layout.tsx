export default function generateStaticParams() {
  return [
    { lang: 'tr' },
    { lang: 'en' },
    { lang: 'el' },
  ];
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const titles: Record<string, string> = {
    tr: 'Ana Sayfa',
    en: 'Home',
    el: 'Αρχική',
  };

  const descriptions: Record<string, string> = {
    tr: 'Haberin Nabzı, Geleceğin Medyası',
    en: 'Your source for Cyprus news and updates',
    el: 'Η πηγή σας για ειδήσεις από την Κύπρο',
  };

  return {
    title: titles[lang] || titles.tr,
    description: descriptions[lang] || descriptions.tr,
    alternates: {
      languages: {
        tr: '/',
        en: '/en',
        el: '/el',
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return children;
}
