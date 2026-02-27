import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ProfileLayout;
