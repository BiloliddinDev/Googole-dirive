"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ChevronDown,
  Info,
  LayoutPanelTop,
  TableProperties,
} from "lucide-react";
import PopoverAction from "./popoveraction";
import { useLayoutState } from "../../hooks/use-layout";

interface HeaderProps {
  label: string;
  isHome?: boolean;
}

const Headers = ({ label, isHome }: HeaderProps) => {
  const { setLayout, layout } = useLayoutState();

  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <Popover>
          <PopoverTrigger className="flex justify-start">
            <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
              <h2 className="text-xl">{label}</h2>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-2 py-2">
            <PopoverAction />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="text-xl">{label}</div>
      )}

      {isHome && (
        <div className="flex items-center space-x-2">
          {layout === "list" ? (
            <div
              role="button"
              onClick={() => setLayout("grid")}
              className="p-2 hover:bg-secondary rounded-full transition"
            >
              <TableProperties className="w-5 h-5" />
            </div>
          ) : (
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
              onClick={() => setLayout("list")}
            >
              <LayoutPanelTop className="w-5 h-5" />
            </div>
          )}

          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <Info className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Headers;
