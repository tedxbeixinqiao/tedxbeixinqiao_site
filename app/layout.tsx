import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
// import type React from 'react'; // No longer needed with LayoutProps
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import type { Metadata } from "next";

// Load font with display: swap to avoid font loading warnings
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "TEDxBeixinqiao - Innovation Illustrated",
  description:
    "TEDxBeixinqiao is an independently organized TED event coming to Beijing on December 6, 2025, bringing people together to share ideas worth spreading.",
  generator: "v0.dev",
};

// Use new Route Props Helper for type safety and future parallel routes
// If LayoutProps is not globally available, fallback to a basic type
// type LayoutProps<P extends string = '/'> = { children: React.ReactNode }
export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {props.children}
              <Analytics />
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
