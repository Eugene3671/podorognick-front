// store/savedStoriesStore.ts
import { create } from "zustand";

interface SavedStoriesStore {
  savedStoryIds: string[];
  setSavedStoryIds: (ids: string[]) => void;
  addSavedStoryId: (id: string) => void;
  removeSavedStoryId: (id: string) => void;
}

export const useSavedStoriesStore = create<SavedStoriesStore>((set) => ({
  savedStoryIds: [],
  setSavedStoryIds: (ids) => set({ savedStoryIds: ids }),
  addSavedStoryId: (id) =>
    set((state) => ({ savedStoryIds: [...state.savedStoryIds, id] })),
  removeSavedStoryId: (id) =>
    set((state) => ({
      savedStoryIds: state.savedStoryIds.filter((s) => s !== id),
    })),
}));
