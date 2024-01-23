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
        <div></div>
      </TableBody>
    </Table>
  );
};

export default Lists;
