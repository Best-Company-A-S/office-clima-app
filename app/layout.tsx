import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provder";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "../providers/ModalProvider";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/lib/store";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <StoreProvider>
              <Toaster position="top-center" />
              <ModalProvider />
              {children}
            </StoreProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
