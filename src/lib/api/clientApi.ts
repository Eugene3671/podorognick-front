import { Story } from "../../types/story";
import { nextServer } from "./api";

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
}: GetStoriesParams): Promise<StoriesResponse> {
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
