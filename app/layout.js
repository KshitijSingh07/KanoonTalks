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
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
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
