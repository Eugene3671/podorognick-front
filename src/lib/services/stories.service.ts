import { Story } from "../../types/story";
import nextServer from "../axios";

interface GetStoriesParams {
  page: number;
  perPage: number;
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
