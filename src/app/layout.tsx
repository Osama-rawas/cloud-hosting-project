import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
// import { Noto_Kufi_Arabic } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
// const kufiArabic = Noto_Kufi_Arabic({
//   subsets: ["arabic"],
//   weight: ["500", "300"],
// });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cloude Hosting",
  description: "Cloude Hosting Project",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ToastContainer theme="colored" draggable position="top-center" />
        <main className="fix-height">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
