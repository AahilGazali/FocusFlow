import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FocusFlow | Smart Study Planner",
  description: "Stay focused and organized with FocusFlow - your personal study companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const removeDevOverlay = () => {
                  const selectors = [
                    '#__next-build-watcher',
                    '[data-nextjs-dialog]',
                    '[data-nextjs-dialog-overlay]',
                    'nextjs-portal',
                    '[data-nextjs-toast]',
                    '[data-nextjs-toast-container]',
                    '.__next-dev-overlay',
                    '.__next-dev-overlay-base'
                  ];
                  selectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => el.remove());
                    } catch(e) {}
                  });
                };
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeDevOverlay);
                } else {
                  removeDevOverlay();
                }
                setInterval(removeDevOverlay, 100);
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
