import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../../lib/utils";

interface IteamProps {
  icon: LucideIcon;
  label: string;
  path?: string;
}

const Item = ({ icon: Icon, label, path }: IteamProps) => {
  //   const pathname = usePathname();

  //   const isActive = pathname === path;

  return (
    <div
      className={cn(
        "flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer",
        "bg-secondary"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="pl-2 text-md opacity-75">{label}</span>
    </div>
  );
};

export default Item;
