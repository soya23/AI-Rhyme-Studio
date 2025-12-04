import type { Metadata } from 'next';
import { Mochiy_Pop_One, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const bodyFont = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-body'
});

const displayFont = Mochiy_Pop_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-display'
});

export const metadata: Metadata = {
    title: 'ラップde老GO',
    description: '思い出をラップで残すNext.jsアプリ'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
        </html>
    );
}
