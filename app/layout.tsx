import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: '4PADEL - Resultados, Rankings y Noticias de Padel',
  description: 'La plataforma definitiva para seguir todas las competiciones de padel: PremierPadel, PadelProLeague, A1PADEL, Padel FIP y Hexagon Cup',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body className={`${dmSans.className} font-sans antialiased`}>{children}</body>
    </html>
  );
}