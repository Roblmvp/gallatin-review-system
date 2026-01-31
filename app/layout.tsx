// app/layout.tsx
// Root layout for the application

import { Metadata, Viewport } from "next";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: "Gallatin CDJR",
    template: "%s | Gallatin CDJR",
  },
  description: "Your personal connection to Gallatin Chrysler Dodge Jeep RAM",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gallatin CDJR",
  },
  formatDetection: {
    telephone: true,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/di5ujiwjp/image/upload/w_192,h_192,c_fill/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Gallatin CDJR" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#D10000" />
        <meta name="msapplication-TileImage" content="https://res.cloudinary.com/di5ujiwjp/image/upload/w_192,h_192,c_fill/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
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
        <PWAInstallPrompt />
        <Analytics />
      </body>
    </html>
  );
}
