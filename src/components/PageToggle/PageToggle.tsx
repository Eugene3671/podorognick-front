"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const PageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(
    pathname.includes("/saved") ? "saved" : "own",
  );

  const switchTab = (tab: "saved" | "own") => {
    setActiveTab(tab);
    router.push(`/profile/${tab}`);
  };

  return (
    <nav className="page-toggle">
      <button
        className={activeTab === "saved" ? "active" : ""}
        onClick={() => switchTab("saved")}
      >
        Збережені історії
      </button>
      <button
        className={activeTab === "own" ? "active" : ""}
        onClick={() => switchTab("own")}
      >
        Мої історії
      </button>
    </nav>
  );
};

export default PageToggle;
