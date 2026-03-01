import { ReactNode } from "react";
import "@/src/app/globals.css";
import PageToggle from "@/src/components/PageToggle/PageToggle";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";

type Props = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <div className={`container offset`}>
      <TravellerInfo />
      <PageToggle />
      {children}
    </div>
  );
};

export default ProfileLayout;
