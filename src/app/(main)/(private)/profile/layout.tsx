import React, { ReactNode } from "react";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";
import PageToggle from "@/src/components/PageToggle/PageToggle";

type Props = {
  children: ReactNode;
  tabs: ReactNode;
};

const ProfileLayout = ({ children, tabs }: Props) => {
  return (
    <main className="container">
      <TravellerInfo />
      <PageToggle />
      {children}
      <div style={{ minHeight: "600px" }}>{tabs}</div>
    </main>
  );
};

export default ProfileLayout;
