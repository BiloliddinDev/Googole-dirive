"use client";

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
import { useLayoutState } from "../../hooks/use-layout";
import SuggestedItem from "./suggested";

interface ListTaype {
  folders: Ifoldertaype[];
  files: Ifoldertaype[];
}

const Lists = ({ files, folders }: ListTaype) => {
  const { layout, setLayout } = useLayoutState();
  return layout === "list" ? (
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
  ) : (
    <div>
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((e) => (
            <Listitem key={e.id} item={e} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Lists;
