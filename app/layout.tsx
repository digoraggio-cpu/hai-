import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hacksystem',
  description: 'Next.js 13 + Express scaffold - Security Testing Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
