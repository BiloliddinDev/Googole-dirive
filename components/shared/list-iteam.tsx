"use client";

import React, { ElementRef, useRef, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Ifoldertaype } from "../../Interface";
import { File, Folder, Minus, Save, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { byteConverter } from "../../lib/utils";
import ListAction from "./list-action";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../lib/firebase";
import { toast } from "sonner";

interface ListTaype {
  item: Ifoldertaype;
}

const Listitem = ({ item }: ListTaype) => {
  const [isEditing, setisEditing] = useState(false);
  const [vale, setValue] = useState(item.name);
  const { refresh } = useRouter();
  const itemRef = useRef<ElementRef<"input">>(null);
  const { user } = useUser();

  const useEditfun = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setisEditing(true);
    setTimeout(() => {
      itemRef.current?.focus();
      itemRef.current?.setSelectionRange(0, vale.length);
    }, 0);
  };

  const onEditing = () => {
    const type = item.size ? "files" : "folders";
    const ref = doc(DB, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      name: vale.length ? vale : "Unnamed",
    }).then(() => {
      setisEditing(false);
      refresh();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "File Editing",
      error: "Failed to archive.",
    });
  };

  const onKeydawn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEditing();
    } else if (e.key === "Escape") {
      setisEditing(false);
    }
  };

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        {isEditing ? (
          <div className="relative">
            <Input
              value={vale}
              ref={itemRef}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeydawn}
            />
            <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
              <Button
                onClick={onEditing}
                size={"sm"}
                variant={"outline"}
                className="h-full"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setisEditing(false)}
                size={"sm"}
                variant={"outline"}
                className="h-full"
              >
                <X />
              </Button>
            </div>
          </div>
        ) : (
          <div
            onDoubleClick={useEditfun}
            className="flex items-center space-x-1"
            role="button"
          >
            {item.size ? (
              <File className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
            )}
            <span>{item?.name}</span>
          </div>
        )}
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), "MMM dd, yyyy")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end items-center space-x-2 group">
        <ListAction item={item} useEditfun={useEditfun} />
      </TableCell>
    </TableRow>
  );
};

export default Listitem;
