"use client";

import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { SessionProvider } from "next-auth/react"; // ✅ import this
"./api/auth/[...nextauth]/route"

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <SessionProvider>
    <html lang="en">
      <head>
        
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
      </body>
    </html>
    </SessionProvider>
  </>
  );
  
}
