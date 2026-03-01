import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Мій профіль",
  description: "Керуйте своїми публікаціями та переглядайте збережені історії.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Мій профіль | Подорожники",
  },
};

export default function ProfilePage() {
  redirect("/profile/saved");
}
