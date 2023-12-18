import React from "react";
import { childrenProps } from "../../Interface";
import Navbar from "../../components/shared/navbar";
import Sidbar from "../../components/shared/sidbar";

const RootLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <Navbar />
      <Sidbar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1f1f1f] pr-4">
        <div className="min-h-[90vh] rounded-xl bg-white dark:bg-black p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
