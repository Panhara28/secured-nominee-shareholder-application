import localFont from "next/font/local";

// Decorative Khmer display font for the "ក្រសួងពាណិជ្ជកម្ម" (Ministry of
// Commerce) heading — swapped from the app-wide Krasar body font to Moul.
export const moul = localFont({
  src: "../public/fonts/Moul/Moul-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-moul",
});
