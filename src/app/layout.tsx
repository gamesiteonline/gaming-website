import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GAMESITEONLINE | Digital Archive of Dreams',
  description: 'Browse and download games from a curated database of classic and modern titles. Neo-brutalism design. English & Kiswahili support.',
  keywords: ['games', 'retro games', 'game database', 'download games', 'DOS games', 'PlayStation games', 'Xbox games', 'emulation'],
  authors: [{ name: 'Fahad Mohamed', url: 'https://t.me/faliz_AI' }],
  creator: 'GAMESITEONLINE',
  publisher: 'GAMESITEONLINE',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamesiteonline.com',
    siteName: 'GAMESITEONLINE',
    title: 'GAMESITEONLINE | Digital Archive of Dreams',
    description: 'Browse and download games from a curated database of classic and modern titles.',
    images: [
      {
        url: 'https://github.com/gamesiteonline/gamesiteonline/blob/main/image/1782870111467.png?raw=true',
        width: 1200,
        height: 630,
        alt: 'GAMESITEONLINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAMESITEONLINE',
    description: 'Digital Archive of Dreams - Browse and download games',
    images: ['https://github.com/gamesiteonline/gamesiteonline/blob/main/image/1782870111467.png?raw=true'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://thumbnails.libretro.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://archive.org" />
      </head>
      <body className={`${inter.variable} font-brutal antialiased`}>
        {children}
      </body>
    </html>
  );
}