import type { Metadata } from 'next';
import { ThemeProvider } from '@/themes';
import { Anek_Bangla } from 'next/font/google';
import { appConfig } from '../../../app.config';
import { Toaster } from '@/components/ui/sonner';

const anek_bangla = Anek_Bangla({
  subsets: ['latin', 'latin-ext', 'bengali'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${anek_bangla.className} bg-primary-10`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <div className="hd:w-[2024px] mx-auto">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
