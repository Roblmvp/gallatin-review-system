// app/layout.tsx
// Root layout for the application

import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Gallatin CDJR Reviews",
    template: "%s | Gallatin CDJR",
  },
  description: "Leave a review for your experience at Gallatin CDJR",
  robots: {
    index: false, // Don't index review links
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#D10000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Supabase for faster API calls */}
        <link
          rel="preconnect"
          href={process.env.SUPABASE_URL}
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
