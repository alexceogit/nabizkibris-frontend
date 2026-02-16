import type { Metadata, Viewport } from 'next';
import { Google_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import '@/styles/globals.css';
import { Providers } from './providers';

const googleSans = Google_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-google-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['haber', 'Kıbrıs', 'KKTC', 'news', 'Cyprus'],
  authors: [{ name: 'NabızKıbrıs' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@nabizkibris',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0066CC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${googleSans.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1D3557',
                color: '#F1FAEE',
              },
              success: {
                iconTheme: {
                  primary: '#0066CC',
                  secondary: '#F1FAEE',
                },
              },
              error: {
                iconTheme: {
                  primary: '#E63946',
                  secondary: '#F1FAEE',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
