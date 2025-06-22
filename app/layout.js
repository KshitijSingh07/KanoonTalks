import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./componets/navbar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Footer from "./componets/footer";
// import Head from "next/head";
// app/layout.jsx (or app/page.jsx, wherever it fits your app router structure)
import './lib/fontawesome'
import { Providers } from './lib/providers';
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'], // You can add more weights if needed
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KanoonTalks",
  description: "A Law blog post website.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}>
      <html lang="en" className="dark">
        <head>
         <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Android Chrome */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Theme */}
        <meta name="theme-color" content="#ffffff" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            rel="stylesheet"
          />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
