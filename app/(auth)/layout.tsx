import React from "react";
import { childrenProps } from "../../Interface";
import Navbar from "../../components/shared/navbar";
import Sidbar from "../../components/shared/sidbar";

const AuthLayout = ({ children }: childrenProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-40 w-screen h-screen bg-black opacity-50"></div>
      <Navbar />
      <Sidbar />
      <main className="flex justify-center items-center w-full z-50 h-[90vh] relative">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
