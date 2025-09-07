import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
interface ChatStore {
  messages: Message[];
  users: [];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getMessages: (userId: string) => Promise<void>;
  getUsers: () => Promise<void>;
  sendMessages: (messagesData: string) => Promise<void>;
  setSelectedUser: (selectedUser: User) => void;
}
interface User {
  _id: string;
  fullname: string;
  userPic: string;
  createdAt: string;
  updatedAt: string;
  email: string;
}
interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  },
  sendMessages: async (messagesData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/${selectedUser?._id}`,
        messagesData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
