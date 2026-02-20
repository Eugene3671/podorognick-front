import axios from "axios";

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
  id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  ownerId: string;
  date: string;
  favoriteCount: number;
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
