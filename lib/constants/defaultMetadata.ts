import { Metadata } from "next";

export const defaultMetadata: Metadata = {
    title: 'Auxdibot',
    description: 'The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.',
    themeColor: "#ee884b",
    metadataBase: new URL(process.env.SITE_URL || `https://localhost:${process.env.PORT || 3000}`),
    icons: "/logo.png",
    openGraph: {
      type: "website",
      title: "Auxdibot",
      siteName: "Auxdibot",
      countryName: "United States",
      description: "The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.",
      url: "https://bot.auxdible.me",
      images: "/icon.png"
    },
    viewport: {
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
      width: "device-width"
    }
    
  };