"use client";

import { FileUp, Folder, FolderUp } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { Separator } from "../ui/separator";
import { useFolder } from "../../hooks/use-folder";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { DB, Storge } from "../../lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PopoverAction = () => {
  const router = useRouter();
  const { onOpen } = useFolder();
  const inputRef = useRef<ElementRef<"input">>(null);
  const { user } = useUser();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const file = files[0];
    let image = "";

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        image = e?.target?.result as string;
      };
    }

    const promise = addDoc(collection(DB, "files"), {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = ref(Storge, `files/${docs.id}/image`);
      uploadString(refs, image, "data_url").then(() => {
        getDownloadURL(refs).then((url) => {
          updateDoc(doc(DB, "files", docs?.id), {
            image: url,
          }).then(() => router.refresh());
        });
      });
    });

    toast.promise(promise, {
      loading: "Lauoding..",
      success: "Uplaud!",
      error: "Error uplauding file",
    });
  };

  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
        role="button"
        onClick={() => onOpen()}
      >
        <Folder className="w-4 h-4" />
        <span>New Folder</span>
      </div>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
          role="button"
        >
          <FileUp className="w-4 h-4" />
          <span>File Up</span>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={onChange}
          ref={inputRef}
          accept="image/*"
        />
      </label>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
          role="button"
        >
          <FolderUp className="w-4 h-4" />
          <span>New FolderUp</span>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={onChange}
          accept="image/*"
          ref={inputRef}
        />
      </label>
    </>
  );
};

export default PopoverAction;
