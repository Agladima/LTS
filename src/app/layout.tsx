import type { Metadata } from "next";
import localFont from "next/font/local";
import BottomPlayerNav from "./components/BottomPlayerNav";
import "./globals.css";

const spotifyMix = localFont({
  src: [
    {
      path: "../../public/font/spotify-mix/SpotifyMix-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/spotify-mix/SpotifyMix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/spotify-mix/SpotifyMix-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/spotify-mix/SpotifyMix-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-spotify-mix",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LTS26 AiC",
  description: "Official Website of AiC LTS26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spotifyMix.variable} antialiased`}>
        <div className="pb-28 sm:pb-32">{children}</div>
        <BottomPlayerNav />
      </body>
    </html>
  );
}
