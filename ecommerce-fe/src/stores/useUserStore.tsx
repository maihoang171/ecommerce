import { create } from "zustand";
import { type IUser } from "../services/user";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserState {
  user: IUser | null;
  setUser: (data: IUser | null) => void;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
