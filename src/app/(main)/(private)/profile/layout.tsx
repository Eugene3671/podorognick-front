import React, { ReactNode } from "react";
import { getMe } from "@/src/lib/services/users.service";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";
import PageToggle from "@/src/components/PageToggle/PageToggle";

type Props = {
  tabs: ReactNode;
};

const ProfileLayout = async ({ tabs }: Props) => {
  const user = await getMe();
  return (
    <div>
      <TravellerInfo user={user} />
      <PageToggle />
      {tabs}
    </div>
  );
};

export default ProfileLayout;
