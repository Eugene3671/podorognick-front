import type { Metadata } from "next";
import { Nunito_Sans, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { cookies } from "next/headers";
import AuthProvider from "../components/providers/AuthProvider";

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
  },
};

async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
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
