import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  blogData: null,
  isLoading: false,

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  fetchBlogData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("blog.json");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      set({ blogData: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
