import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
interface signupprops {
  fullName: string;
  email: string;
  password: string;
}
interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  signup: (data: signupprops) => void;
  isUpdatingProfile: boolean;
  updatingProfile: (data: string | ArrayBuffer | null) => Promise<void>;
  Login: (data: object) => Promise<void>;
  isLoggingIn: boolean;
  Logout: () => Promise<void>;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}
interface User {
  _id: string;
  fullname: string;
  userPic: string;
  createdAt: string;
  updatedAt: string;
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
      const response = await axiosInstance.get("/api/auth/check");
      console.log(response.data);
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
      console.log(data);
      const response = await axiosInstance.post("/api/auth/signup", data);
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
      console.log(data);
      const response = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: response.data });
      console.log(response.data);
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
      const response = await axiosInstance.post("/api/auth/update-profile", {
        profilePic: data,
      });
      set({ authUser: response.data });
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
  Logout: async () => {
    try {
      set({ isLoggingIn: true });
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },
}));
