import React from "react";
import { childrenProps } from "../../Interface";
import Navbar from "../../components/shared/navbar";
import Sidbar from "../../components/shared/sidbar";

const AuthLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <Navbar />
      <Sidbar />
      <main className="flex justify-center items-center w-full h-[90vh]  relative">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
