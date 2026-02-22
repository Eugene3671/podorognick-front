import axios from "axios";
import { Story } from "../types/story";
import { Category } from "../types/category";

// const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

interface GetStoriesParams {
  page: number;
  perPage: number;
}

export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  page: number;
}

export async function getAllStories({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<StoriesResponse> {
  const response = await nextServer.get("/stories", {
    params: { page, perPage },
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

export async function getMe() {
  const res = await nextServer.get("/users/profile", {
    withCredentials: true,
  });
  return res.data;
}
