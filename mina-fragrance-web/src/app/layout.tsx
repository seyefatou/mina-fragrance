import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

export const metadata: Metadata = {
  title: 'MinaaFragrance - Votre monde, parfumé à la perfection',
  description: 'Découvrez notre collection exclusive de parfums, brumes, laits de corps, huiles vergeture, déodorants, gels de douche et crèmes. Qualité premium au Sénégal.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  keywords: ['parfum', 'brume', 'lait de corps', 'déodorant', 'gel douche', 'crème main', 'huile vergeture', 'Sénégal', 'MinaaFragrance'],
  authors: [{ name: 'MinaaFragrance' }],
  openGraph: {
    title: 'MinaaFragrance - Votre monde, parfumé à la perfection',
    description: 'Collection exclusive de parfums, soins du corps et déodorants au Sénégal',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#1f2937',
                borderRadius: '12px',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#EC4899',
                  secondary: '#fff',
                },
              },
            }}
          />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
