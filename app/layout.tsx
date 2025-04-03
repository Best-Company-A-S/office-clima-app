import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provder";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Office Clima",
  description: "Office Clima by BestCompany A/S",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
