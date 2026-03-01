import { StoryFormValues } from "@/src/components/StoryForm/StoryForm";
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

export async function getStoryById(storyId: string): Promise<Story> {
  const response = await nextServer.get<Story>(`/stories/${storyId}`);
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
): Promise<StoriesResponse> {
  const response = await nextServer.get<StoriesResponse>("/stories/saved", {
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

// export async function creatStory(formData: FormData): Promise<Story> {
//   const res = await nextServer.post("/stories", formData);
//   return res.data;
// }

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

export async function updateStory(
  id: string,
  data: StoryFormValues,
): Promise<Story> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("article", data.article);
  formData.append("category", data.category);
  formData.append("date", data.date);
  if (data.img) formData.append("img", data.img);

  const res = await nextServer.patch(`/stories/${id}`, formData);
  return res.data;
}
