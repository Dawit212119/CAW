import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
interface AuthStore {
  authUser: null;
  isSigningUp: boolean;
  signup: (data: object) => void;
  Login: (data: object) => void;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      console.log(response);
      set({ authUser: response.data });
    } catch (error) {
      console.log("error in checkingAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  },
  Login: async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      set({ authUser: response.data });
    } catch (error) {}
  },
}));
