import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/inter-variable.woff2",
  variable: "--font-inter",
});

const krasar = localFont({
  src: [
    { path: "../public/fonts/Krasar-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Krasar-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Krasar-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-krasar",
});

export const metadata: Metadata = {
  title: "Secured Nominee Shareholder",
  description: "Secured Nominee Shareholder Business Registration Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${krasar.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
