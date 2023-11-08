import localFont from "next/font/local";

export const futuraPt = localFont({
  src: [
    {
      path: "../../../public/fonts/FuturaPT-Light.woff2",
      weight: "300",
    },
    {
      path: "../../../public/fonts/FuturaPT-Book.woff2",
      weight: "400",
    },
    {
      path: "../../../public/fonts/FuturaPT-BookObl.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../../public/fonts/FuturaPT-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../../public/fonts/FuturaPT-MediumObl.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "../../../public/fonts/FuturaPT-Demi.woff2",
      weight: "600",
    },
    {
      path: "../../../public/fonts/FuturaPT-Heavy.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-futura-pt",
});
