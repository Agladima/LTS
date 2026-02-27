import type { Metadata } from "next";
import localFont from "next/font/local";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spotifyMix.variable} antialiased`}>
        <main className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white">
          <h1 className="text-2xl font-bold sm:text-4xl">
            SITE UNDER MAINTAINANCE
          </h1>
        </main>
      </body>
    </html>
  );
}
