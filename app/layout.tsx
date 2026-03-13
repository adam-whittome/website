import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adam Whittome",
  description: "Personal website by Adam Whittome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
