import "../styles/global.css";
import { Metadata } from "next";
import PlausibleProvider from 'next-plausible'

export const metadata: Metadata = {
  title: "Tweet Video Renderer",
  description: "Render tweet videos as MP4 locally.",
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
        <PlausibleProvider domain="" />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
