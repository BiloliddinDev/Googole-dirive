import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../../../lib/firebase";
import { auth } from "@clerk/nextjs";
import Headers from "../../../components/shared/headers";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Listitem from "../../../components/shared/list-iteam";
import SuggestedItem from "../../../components/shared/suggested";

const getData = async (uid: string, type: "files" | "folders") => {
  let data: any[] = [];
  const q = query(
    collection(DB, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    where("isStar", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

const StarredPage = async () => {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Headers label="Starred" />
      {[...folders, ...files].length === 0 ? (
        // <Empty />
        <div></div>
      ) : (
        <>
          <div className="text-sm opacity-70 mt-6">Suggested</div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {files.map((item) => (
              <SuggestedItem item={item} key={item?.id} />
            ))}
          </div>
          <div className="text-sm opacity-70 mt-6">Folders</div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>File size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folders.map((folder) => (
                <Listitem key={folder.id} item={folder} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default StarredPage;
