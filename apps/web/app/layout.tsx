import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ReactScanProvider } from '@repo/ui/react-scan-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bond Yield Calculator',
  description: 'Calculate bond yields with precision',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactScanProvider>{children}</ReactScanProvider>
      </body>
    </html>
  );
}
