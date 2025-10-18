import "../styles/global.css";
import { Metadata } from "next";
import PlausibleProvider from 'next-plausible'
// Import to initialize Supabase status check
import "../lib/supabase-status";

export const metadata: Metadata = {
  title: "tweeto.lol",
  description: "Download video tweets as mp4, frame included.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="tweeto.lol" />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
