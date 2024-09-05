import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayFlix",
  description: "Pay and watch your favorite movies and TV shows",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={inter.className}>
        <Providers>  
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
    </SessionProvider>
  );
}
