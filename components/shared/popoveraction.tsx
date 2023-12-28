import { FileUp, Folder, FolderUp } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

const PopoverAction = () => {
  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
        role="button"
      >
        <Folder className="w-4 h-4" />
        <span>New Folder</span>
      </div>
      <Separator />
      <div
        className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
        role="button"
      >
        <FileUp className="w-4 h-4" />
        <span>File Up</span>
      </div>
      <Separator />
      <div
        className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
        role="button"
      >
        <FolderUp className="w-4 h-4" />
        <span>New FolderUp</span>
      </div>
    </>
  );
};

export default PopoverAction;
