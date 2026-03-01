import type { Metadata } from "next";
import { Nunito_Sans, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/src/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/src/components/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/src/components/provider/ThemeProvider";

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
  metadataBase: new URL("https://podorognick-front.vercel.app"),

  title: "Подорожники",
  description:
    "Наша платформа створена, щоб об`єднати людей, закоханих у відкриття нового. Тут ви можете ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з нами.",
  openGraph: {
    title: "Подорожники",
    description:
      "Наша платформа створена, щоб об`єднати людей, закоханих у відкриття нового. Тут ви можете ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з нами.",
    url: `/`,
    siteName: "Подорожники",
    images: [
      {
        url: "/Cover.jpg",
        width: 1200,
        height: 630,
        alt: "Подорожники",
      },
    ],
    type: "website",
  },
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${nunitoSans.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/Favicon.svg" />
      </head>
      <body>
               <ThemeProvider>
          <AuthProvider>
            <TanStackProvider>
              <main>{children}</main>
            </TanStackProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
