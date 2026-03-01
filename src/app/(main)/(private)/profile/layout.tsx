import { ReactNode } from "react";
import PageToggle from "@/src/components/PageToggle/PageToggle";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";

type Props = {
  children: ReactNode;
  tabs: React.ReactNode;
};

const ProfileLayout = ({ children, tabs }: Props) => {
  return (
    <div className="container">
      <TravellerInfo />
      <PageToggle />
      {children}
    </div>
  );
};

export default ProfileLayout;
