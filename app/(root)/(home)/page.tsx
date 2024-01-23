import { UserButton, auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB } from "../../../lib/firebase";
import Headers from "../../../components/shared/headers";
import Lists from "../../../components/shared/lists";

const getFolder = async (uid: string, type: "files" | "folders") => {
  let datas: any = [];

  const q = query(
    collection(DB, type),
    where("uid", "==", uid),
    where("isArchive", "==", false)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    datas.push({ ...doc?.data(), id: doc.id });
  });

  return datas;
};

const Home = async () => {
  const { userId } = auth();
  const folders = await getFolder(userId!, "folders");
  const files = await getFolder(userId!, "files");

  return (
    <div>
      <Headers label={"My Drive "} isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </div>
  );
};

export default Home;
