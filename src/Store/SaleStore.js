import { create } from "zustand";

const initialState = {
  itens: [],
  cliente: null,
  cpf: null,
  index: 0,
};

export const useSaleStore = create((set, get) => ({
  itens: [],
  cliente: null,
  cpf: null,
  index: 0,
  getTotal: () => {
    return get().itens.reduce((acc, item) => acc + item.valorTotal, 0);
  },
  setCliente: (cliente) => set((state) => ({ ...state, cliente })),
  setCPF: (cpf) => set((state) => ({ ...state, cpf })),
  clearSale: () => set(initialState),
  addItem: (item) =>
    set((state) => ({
      itens: [...state.itens, { ...item, index: state.index + 1 }],
      index: state.index + 1,
    })),
  removeItem: (id) =>
    set((state) => ({
      itens: state.itens.filter((item) => item.index !== id),
    })),
  loadItens: (itens) =>
    set(() => ({
      itens,
    })),
}));
