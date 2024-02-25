"use client";

import React, { ElementRef, useRef, useState } from "react";
import { Ifoldertaype } from "../../Interface";
import { Divide, File, Paperclip, Save, X } from "lucide-react";
import Image from "next/image";
import { defineImageAndFile } from "../../lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";
import ListAction from "./list-action";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../lib/firebase";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface suggestedType {
  item: Ifoldertaype;
}

const SuggestedItem = ({ item }: suggestedType) => {
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
    <div className="max-w-[300px] max-h-[400px] h-[210px] flex flex-col rounded-sm shadow-lg p-4 bg-secondary group ">
      {!isEditing ? (
        <div
          className="flex items-center space-x-2"
          role="button"
          onDoubleClick={useEditfun}
        >
          <Paperclip className="w-4 h-4 text-blue-500" />
          <span className="text-sm opacity-70">{item?.name}</span>
        </div>
      ) : (
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
      )}
      <div className="relative h-[70%] w-full bg-white dark:bg-black mt-2 rounded-md">
        {defineImageAndFile(item.type) === "file" ? (
          <File className="w-16 h-16" strokeWidth={1} />
        ) : (
          <Image fill src={item.image} alt="image" className="object-cover" />
        )}
      </div>

      <div className="flex items-center w-full justify-between space-x-2 mt-4">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="opacity-75">me</span>
        </div>
        <div>
          <ListAction item={item} useEditfun={useEditfun} />
        </div>
      </div>
    </div>
  );
};

export default SuggestedItem;
