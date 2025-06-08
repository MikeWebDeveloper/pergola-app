import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

export const metadata: Metadata = {
  title: "Pergola Configurator",
  description: "Configure your custom pergola.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-background font-sans antialiased">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
