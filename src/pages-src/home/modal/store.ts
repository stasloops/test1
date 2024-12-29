import { create } from "zustand";

interface IUseFilter {
  limit: number;
  offset: number;
  search: string;
  setSearch: (search: string) => void;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
}

export const useFilter = create<IUseFilter>()((set) => ({
  limit: 20,
  offset: 0,
  search: '',
  setSearch: (search) => set({ search }),
  setLimit: (limit) => set({ limit }),
  setOffset: (offset) => set({ offset }),
}));
