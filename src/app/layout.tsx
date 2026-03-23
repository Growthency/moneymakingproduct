import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proofly — AI-Powered Testimonial Platform",
  description: "Collect, manage, and showcase customer testimonials that drive conversions. Embed beautiful social proof anywhere in minutes.",
  keywords: ["testimonials", "social proof", "reviews", "customer feedback"],
  openGraph: {
    title: "Proofly — Testimonials That Convert",
    description: "Turn customer love into revenue with AI-powered testimonial management",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConvexClientProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1f2937", color: "#f9fafb", borderRadius: "8px" },
              success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
            }}
          />
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
