import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hacksystem - Security Testing Platform',
  description: 'Educational hacking lab with JWT auth, IDOR, and privilege escalation challenges',
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
