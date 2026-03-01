"use client";

import "@/src/app/globals.css";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      <Header />
      <main className={clsx("offset", isHome && "homePage")}>{children}</main>
      <Footer />
    </>
  );
}
