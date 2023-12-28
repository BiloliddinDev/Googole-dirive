import React from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Item from "./iteam";
import { Progress } from "../ui/progress";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverAction from "./popoveraction";

const Sidbar = () => {
  return (
    <div className="h-[90vh] fixed w-72 top-[10vh] left-0 z-30 bg-[#f6f9fc] dark:bg-[#1f1f1f] border-r">
      <div className="flex flex-col  p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit h-12 rounded-full px-6">
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 py-2">
            <PopoverAction />
          </PopoverContent>
        </Popover>

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((e) => (
            <Link href={e.path} key={e.path}>
              <Item icon={e.icon} label={e.label} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={30} />
            <span>20 Mb of 1.5 Gb used</span>
            <Button className="rounded-full" variant={"outline"}>
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidbar;

const sidebarLinks = [
  {
    label: "My drive",
    icon: Tablet,
    path: "/",
  },
  {
    label: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    label: "Recent",
    icon: Clock5,
    path: "/recent",
  },
  {
    label: "Trash",
    icon: Trash,
    path: "/trash",
  },
  {
    label: "Storage",
    icon: Cloud,
    path: "/cloud",
  },
];
