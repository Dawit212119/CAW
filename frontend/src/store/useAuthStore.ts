import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  signup: (data: object) => void;
  isUpdatingProfile: boolean;
  updatingProfile: (data: string | ArrayBuffer | null) => void;
  Login: (data: object) => void;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
}
interface User {
  _id: string;
  fullname: string;
  userPic: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}
export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
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
      if (error instanceof Error) {
        console.log(error);

        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  },
  Login: async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      set({ authUser: response.data });
    } catch (error) {
      if (error instanceof Error) {
        set({ authUser: null });
        toast.error(error.message);
      } else {
        set({ authUser: null });

        toast.error("Internal server error");
      }
    }
  },
  updatingProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      await axiosInstance.post("/auth/update-profile", { profilePic: data });
      toast.success("Profile Updated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
