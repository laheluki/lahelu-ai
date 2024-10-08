import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Lahelu AI - Chatbot Multi Models',
  description: 'Lahelu AI - Chat with your favourite model.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <main className='sm:px-10 px-5'>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
