import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Me Do List",
  description: "Organize everything with Me Do List.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
