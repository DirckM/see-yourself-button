import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "See Yourself Button",
  description: "A shiny metal button that reflects your webcam feed",
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
