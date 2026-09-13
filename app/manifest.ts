import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Llamingo Films',
    short_name: 'Llamingo',
    description: 'Agencia creativa y productora audiovisual de Ecuador.',
    start_url: '/#inicio',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3478f6',
    icons: [
      {
        src: '/llamingo-app-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  };
}
