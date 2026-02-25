import type { Metadata } from "next";
import { Nunito_Sans, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  display: "swap",
});



export const metadata: Metadata = {
  title: {
    default: "Podorognick",
    template: "%s | Podorognick",
  },
  description: "Платформа для мандрівників",
  icons: {
    icon: "favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${nunitoSans.variable} ${inter.variable}`}>
      <body>
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
