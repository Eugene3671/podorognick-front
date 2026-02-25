import React, { ReactNode } from "react";
import HeaderAuth from "@/src/components/Header/HeaderAuth";
import FooterAuth from "@/src/components/Footer/FooterAuth";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderAuth />
      <main>{children}</main>
      <FooterAuth />
    </>
  );
};

export default AuthLayout;
