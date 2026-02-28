import type { Metadata } from "next";
import { Nunito_Sans, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { cookies } from "next/headers";
import AuthProvider from "../components/providers/AuthProvider";
import { getCurrentUser } from "../lib/api/serverSide/authServerApi";

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
  title: "Подорожники",
  description:
    "Наша платформа створена, щоб об`єднати людей, закоханих у відкриття нового. Тут ви можете ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з нами.",
  openGraph: {
    title: "Подорожники",
    description:
      "Наша платформа створена, щоб об`єднати людей, закоханих у відкриття нового. Тут ви можете ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з нами.",
    url: `https://podorognick-front.vercel.app/`,
    siteName: "Подорожники",
    images: [
      {
        url: "https://podorognick-front.vercel.app/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Подорожники",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log("SERVER USER:", user);
  return (
    <html lang="uk" className={`${nunitoSans.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/Favicon.svg" />
      </head>
      <body>
        <AuthProvider user={user}>
          <TanStackProvider>
            <main>{children}</main>
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
