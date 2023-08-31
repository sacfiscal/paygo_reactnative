import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useConfigStore = create(
  persist(
    (set, get) => ({
      cnpj: "",
      nfce: 0,
      serie: 0,
      addCompany: (cnpj) => set({ cnpj }),
    }),
    {
      name: "config-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
