import { Story } from "../../types/story";
import { nextServer } from "./api";

interface GetStoriesParams {
  page: number;
  perPage: number;
  sort: string;
  category?: string;
}

export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  page: number;
}

export async function getAllStories(
  params: GetStoriesParams,
): Promise<StoriesResponse> {
  const response = await nextServer.get<StoriesResponse>("/stories", {
    params,
  });

  return response.data;
}
export async function getSavedStories(): Promise<Story[]> {
  const response = await nextServer.get<Story[]>("/stories/saved");
  return response.data;
}
export async function addToSavedStories(storyId: string) {
  const response = await nextServer.post(`/stories/${storyId}/save`);
  return response.data;
}

export async function removeFromSavedStories(storyId: string) {
  const response = await nextServer.delete(`/stories/${storyId}/save`);
  return response.data;
}

// -------- STORIES --------

// Data Transfer Object для створення історії

export interface CreateStoryDto {
  title: string;
  article: string;
  category: string; // <-- ID категорії
  img?: File | null;
  date: string;
}

export const createStory = async (story: CreateStoryDto) => {
  const formData = new FormData();

  formData.append("title", story.title);
  formData.append("article", story.article);
  formData.append("category", story.category); // ID
  formData.append("date", story.date);

  if (story.img) {
    formData.append("img", story.img);
  }

  return nextServer.post("/stories", formData);
};
