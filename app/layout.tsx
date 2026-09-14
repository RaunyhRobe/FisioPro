import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fisio Pro | Fisioterapia Esportiva e Ortopédica em Louveira',
  description: 'Avaliação individual, testes objetivos e reabilitação por fases para retorno seguro ao esporte e à rotina em Louveira, SP.',
  metadataBase: new URL('https://fisio-pro-movimento.vvcnwwkzj5.chatgpt.site'),
  icons: { icon: '/images/mark-white.png' },
  openGraph: {
    title: 'Fisio Pro | Movimento é liberdade.',
    description: 'Avaliação individual, testes objetivos e reabilitação por fases para retorno seguro ao esporte e à rotina.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Fisio Pro — Movimento é liberdade.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fisio Pro | Movimento é liberdade.',
    description: 'Avaliação individual, testes objetivos e reabilitação por fases para retorno seguro ao esporte e à rotina.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
