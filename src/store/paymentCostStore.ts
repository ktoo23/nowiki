import { create } from "zustand";

interface PaymentCostStore {
  name: string;
  price: number;
  setPrice: (price: number) => void;
}

export const usePaymentCostStore = create<PaymentCostStore>((set) => ({
  name: "paymentCostStore",
  price: 0,
  setPrice: (price: number) => set({ price }),
}));
