import { ReactNode } from "react";
import "@/src/app/globals.css";
import PageToggle from "@/src/components/PageToggle/PageToggle";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";
import css from "@/src/app/(main)/(private)/profile/page.module.css";
type Props = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <section className={`container ${css.profileSection}`}>
      <TravellerInfo />
      <PageToggle />
      {children}
    </section>
  );
};

export default ProfileLayout;
