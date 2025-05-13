import Layout from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MDS Arena",
  description: "Site pour la LAN 2025 de MDS Grenoble - Par les M1 DFS et avec l'aide de Marie PAYEN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
