// components/TrackingPixels.tsx
// Add this component to your layout for pixel tracking
// TOMORROW: Replace placeholder IDs with actual pixel IDs

"use client";

import Script from "next/script";

// REPLACE THESE WITH YOUR ACTUAL PIXEL IDs TOMORROW
const PIXELS = {
  META_PIXEL_ID: "YOUR_META_PIXEL_ID", // Facebook/Instagram
  TIKTOK_PIXEL_ID: "YOUR_TIKTOK_PIXEL_ID",
  GOOGLE_TAG_ID: "YOUR_GOOGLE_TAG_ID", // GA4 or Google Ads
  BING_UET_ID: "YOUR_BING_UET_ID", // Microsoft/Bing
};

export default function TrackingPixels() {
  return (
    <>
      {/* Meta Pixel (Facebook/Instagram) */}
      {PIXELS.META_PIXEL_ID !== "YOUR_META_PIXEL_ID" && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXELS.META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXELS.META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* TikTok Pixel */}
      {PIXELS.TIKTOK_PIXEL_ID !== "YOUR_TIKTOK_PIXEL_ID" && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${PIXELS.TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Google Tag (GA4/Google Ads) */}
      {PIXELS.GOOGLE_TAG_ID !== "YOUR_GOOGLE_TAG_ID" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${PIXELS.GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${PIXELS.GOOGLE_TAG_ID}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft/Bing UET */}
      {PIXELS.BING_UET_ID !== "YOUR_BING_UET_ID" && (
        <Script id="bing-uet" strategy="afterInteractive">
          {`
            (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${PIXELS.BING_UET_ID}"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
          `}
        </Script>
      )}
    </>
  );
}
