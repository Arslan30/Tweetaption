import "../styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "tweeto.lol",
  description: "tweeto.lol is a simple and easy tool to download X/Twitter videos without losing context (the tweet's text and frame is included in the video).",
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
        <script defer data-domain="tweeto.lol" src="https://plausible.io/js/script.js" />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
