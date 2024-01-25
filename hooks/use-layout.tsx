import { create } from "zustand";

type LayautStore = {
  layout: "list" | "grid";
  setLayout: (layout: "list" | "grid") => void;
};

export const useLayout = create<LayautStore>((set) => {
  return {
    layout: "list",
    setLayout: (layout) => set({ layout }),
  };
});
