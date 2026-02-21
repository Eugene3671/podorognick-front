import axios from "axios";
import { Story } from "../types/story";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

interface GetStoriesParams {
  page: number;
  perPage: number;
  category: string;
}

interface StoriesResponse {
  stories: Story[];
  totalPages: number;
}

export async function getStories({
  page,
  perPage,
  category,
}: GetStoriesParams): Promise<StoriesResponse> {
  const response = await nextServer.get<StoriesResponse>("/notes", {
    params: {
      page,
      perPage,
      category,
    },
  });

  return response.data;
}
