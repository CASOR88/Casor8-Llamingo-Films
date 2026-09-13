import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Llamingo Films — Ideas imposibles de ignorar',
  description: 'Agencia creativa y productora audiovisual de Ecuador. Publicidad, producción y experiencias que mueven marcas.',
  openGraph: {
    title: 'Llamingo Films — Ideas imposibles de ignorar',
    description: 'Agencia creativa y productora audiovisual de Ecuador.',
    images: [{ url: '/og.png', width: 1728, height: 912, alt: 'Llamingo Films — Ideas imposibles de ignorar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Llamingo Films — Ideas imposibles de ignorar',
    description: 'Agencia creativa y productora audiovisual de Ecuador.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/llamingo-app-icon.svg',
    shortcut: '/llamingo-app-icon.svg',
    apple: '/llamingo-app-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
