import axios from "axios";
import { Story } from "../types/story";
import { Category } from "../types/category";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

interface GetStoriesParams {
  page: number;
  perPage: number;
  category?: Category;
}

export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  page: number;
}

export async function getAllStories({
  page,
  perPage,
  category,
}: GetStoriesParams): Promise<StoriesResponse> {
  const response = await nextServer.get("/stories", {
    params: {
      page,
      perPage,
      category,
    },
  });

  return response.data;
}

export async function addToSavedStories(storyId: string) {
  const response = await nextServer.post(`/stories/${storyId}/save`);

  return response.data;
}

export async function removeFromSavedStories(storyId: string) {
  const res = await nextServer.delete(`/stories/${storyId}/save`);
  return res.data;
}
