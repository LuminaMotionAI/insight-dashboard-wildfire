import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: '산불 현황 대시보드',
  description: '실시간 산불 발생 현황과 자원 배치 상태를 확인할 수 있는 종합 정보 시스템',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors">
        <ThemeToggle />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
} 