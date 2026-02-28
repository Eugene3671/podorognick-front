import { Category } from "@/src/types/category";
import { Story } from "../../types/story";
import { nextServer } from "./api";

interface GetStoriesParams {
  page: number;
  perPage: number;
  sort?: string;
  category?: string;
}

export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  page: number;
}
interface PaginationParams {
  page: number;
  perPage: number;
}

export async function getAllStories(
  params: GetStoriesParams,
): Promise<StoriesResponse> {
  const response = await nextServer.get<StoriesResponse>("/stories", {
    params,
  });

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

export async function getSavedStories(
  params: PaginationParams,
): Promise<Story[]> {
  const response = await nextServer.get<Story[]>("/stories/saved", {
    params,
  });
  return response.data;
}

export async function getMyStories(
  params: PaginationParams,
): Promise<StoriesResponse> {
  const res = await nextServer.get("/stories/my", { params });
  return res.data;
}

export async function creatStory(formData: FormData): Promise<Story> {
  const res = await nextServer.post("/stories", formData);
  return res.data;
}

export async function updateStory(
  id: string,
  data: Partial<Story>,
): Promise<Story> {
  const res = await nextServer.patch(`/stories/${id}`, data);
  return res.data;
}
