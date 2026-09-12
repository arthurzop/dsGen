import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const appSans = Inter({
  subsets: ["latin"],
  variable: "--font-app-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dsgen.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "dsGen - Styleguide Generator",
    template: "%s · dsGen",
  },
  description:
    "Transforme os fundamentos visuais do seu projeto em um brand styleguide gerado automaticamente. Logo, tipografia, cores e aplicações, tudo em um documento consistente e pronto pra exportar.",
  keywords: [
    "brand styleguide",
    "design system generator",
    "brand book",
    "identidade visual",
    "style guide",
    "ferramenta para designers",
  ],
  authors: [{ name: "dsGen" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "dsGen",
    title: "dsGen: Styleguide Generator",
    description:
      "Transforme os fundamentos visuais do seu projeto em um brand styleguide gerado automaticamente.",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "dsGen: Styleguide Generator",
    description:
      "Transforme os fundamentos visuais do seu projeto em um brand styleguide gerado automaticamente.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={appSans.variable}>
      <body>{children}</body>
    </html>
  );
}
