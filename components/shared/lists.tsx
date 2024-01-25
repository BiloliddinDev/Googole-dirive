import React from "react";
import { Ifoldertaype } from "../../Interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Listitem from "./list-iteam";

interface ListTaype {
  folders: Ifoldertaype[];
  files: Ifoldertaype[];
}

const Lists = ({ files, folders }: ListTaype) => {
  return (
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
  );
};

export default Lists;
