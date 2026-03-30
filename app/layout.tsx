import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuvraj Singh — AI Engineer & Cybersecurity',
  description: 'MSc AI at National College of Ireland. SOC Engineer, NLP builder, AI systems developer. Open to AI Engineering & Cybersecurity roles.',
  openGraph: { title: 'Yuvraj Singh', images: ['/profile.jpg'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
