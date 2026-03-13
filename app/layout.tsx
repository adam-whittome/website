import type { Metadata } from "next";
import "./globals.css";
import { Merriweather } from "next/font/google";

export const metadata: Metadata = {
  title: "Adam Whittome - Software Developer",
  description: "Personal website by Adam Whittome",
};

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={merriweather.variable}>{children}</body>
    </html>
  );
}
