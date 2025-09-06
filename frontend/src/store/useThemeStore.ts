import { create } from "zustand";
interface themeStore {
  theme: string;
  setTheme: (theme: string) => void;
}
export const useThemeStore = create<themeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
