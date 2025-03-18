import ScrollTop from "@/components/particals/scroll-top/scroll-top";
import {MainLayout} from "@/layouts/page-layouts";
import ReactQueryProvider from "@/providers/react-query-provider";
import RxProvider from "@/providers/rx-provider";
import type {Metadata, Viewport} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "react-hot-toast";
import "swiper/css";
import "./globals.css";
import "@/styles/embla.css";
import {META_DATA} from "@/configs";
import SettingProviderContainer from "@/providers/setting-provider-container";
import "rc-slider/assets/index.css";
import "react-photo-view/dist/react-photo-view.css";
export const metadata: Metadata = {
    metadataBase: new URL('https://nvbplay-storefront.vercel.app'),
    title: {
      template: "%s",
      default: META_DATA.title,
    },
    description: META_DATA.description,
    openGraph: {
      title: META_DATA.og_title,
      description: META_DATA.og_description,
      url: 'https://nvbplay-storefront.vercel.app',
      locale: "en-US",
      siteName: META_DATA.title,
      type: "website",
      images: [
        {
          url: META_DATA.image,
        },
      ],
    },
    twitter: {
      title: META_DATA.twitter_title,
      description: META_DATA.twitter_description,
      images: META_DATA.image,
      card: "summary_large_image",
    },
    alternates: {
      canonical: 'https://nvbplay-storefront.vercel.app',
    },
    keywords: META_DATA.keywords,
    icons: {
      icon: [
        {
          url: META_DATA.icon,
          type: "image/png",
        },
        {
          url: META_DATA.icon,
          media: "(prefers-color-scheme: dark)",
          type: "image/png",
        },
        {
          url: META_DATA.icon,
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: META_DATA.icon,
          sizes: "32x32",
          type: "image/png",
        },
      ],
      shortcut: [META_DATA.icon],
      apple: [
        { url: META_DATA.icon },
        {
          url: META_DATA.icon,
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: META_DATA.icon,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_KEY,
    },
  };

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    // interactiveWidget: "resizes-visual",
    // themeColor: "#FFFFFF",
  };
}

const plusJakarta = Plus_Jakarta_Sans({
  display: "auto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.className}`}>
        <SettingProviderContainer>
          <ReactQueryProvider>
            <RxProvider>
              <NextTopLoader showSpinner={false} color="#FF3F1A" />
              <MainLayout>{children}</MainLayout>
              <ScrollTop />
              {/* <ChatBot /> */}
            </RxProvider>
          </ReactQueryProvider>
          <Toaster position="top-right" />
        </SettingProviderContainer>
      </body>
    </html>
  );
}
