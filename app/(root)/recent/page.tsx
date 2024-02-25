import React from "react";
import Headers from "../../../components/shared/headers";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { DB } from "../../../lib/firebase";
import { auth } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Listitem from "../../../components/shared/list-iteam";

const getData = async (uid: string, type: "files" | "folders") => {
  let data: any[] = [];
  const q = query(
    collection(DB, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

const Recentpage = async () => {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Headers label="Recent" />
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...folders, ...files].map((e) => (
            <Listitem key={e.id} item={e} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Recentpage;
