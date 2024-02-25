import React from "react";
import { Ifoldertaype } from "../../Interface";
import {
  Download,
  Folder,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface listAction {
  item: Ifoldertaype;
  useEditfun?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ListAction = ({ item, useEditfun }: listAction) => {
  const { refresh } = useRouter();
  const type = item.size ? "files" : "folders";

  const onDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const ref = doc(DB, type, item.id);
    const promise = setDoc(ref, {
      ...item,
      isArchive: true,
      isArchiveTime: new Date(),
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "isArchived!",
      error: "Failed to archive.",
    });
  };
  // delete folder and File

  const onStar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const ref = doc(DB, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      isStar: true,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "isStarted!",
      error: "Failed to star.",
    });
  };

  const onRemoveStar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const ref = doc(DB, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      isStar: false,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Is not Started!",
      error: "Failed to star.",
    });
  };

  const Ondawload = () => {
    if (!item.size) {
      toast.error("This is a folder not a file!");
      return;
    }

    window.open(item.image, "_blank");
  };

  const onShare = () => {
    if (!item.size) {
      toast.error("It is cannot share");
      return;
    }

    navigator.clipboard.writeText(item.image);

    toast.success("This is Copy image!");
  };

  return (
    <div className="flex items-center space-x-1">
      <div
        role="button"
        onClick={onDelete}
        className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="w-4 h-4 opacity-50" />
      </div>
      {item.isStar ? (
        <div
          onClick={onRemoveStar}
          role="button"
          className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
      ) : (
        <div
          onClick={onStar}
          role="button"
          className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        >
          <Star className="w-4 h-4 opacity-50" />
        </div>
      )}

      <Popover>
        <PopoverTrigger className="flex justify-start" asChild>
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <MoreVertical className="h-4 w-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="px-1 py-2 ">
          <div
            onClick={Ondawload}
            className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
            role="button"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </div>
          <div
            className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
            role="button"
            onClick={useEditfun}
          >
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </div>
          <Separator />

          <div
            className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
            role="button"
            onClick={onShare}
          >
            <UserPlus className="w-4 h-4" />
            <span>Share</span>
          </div>
          <div
            className="flex items-center hover:bg-secondary transition py-2 space-x-2 text-sm"
            role="button"
            onClick={onDelete}
          >
            <Trash className="w-4 h-4" />
            <span>Move to trash</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListAction;
