import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface childrenProps {
  children: ReactNode;
}

export interface Ifoldertaype {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  image: string;
  type: string;
  size: number;
  isStar: boolean;
  archivedTime: Timestamp;
}
