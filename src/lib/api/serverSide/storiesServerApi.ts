import { Story } from "@/src/types/story";
import { nextServer } from "../api";
import { cookies } from 'next/headers';


export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  page: number;
}

interface PaginationParams {
  page: number;
  perPage: number;
}

export async function getServerStoryById(storyId: string): Promise<Story> {
  const res = await nextServer.get<Story>(`/stories/${storyId}`);
  return res.data;
}

export async function getSavedStoriesServer(params: PaginationParams,
): Promise<StoriesResponse> {
  const cookieStore = await cookies();

  const response = await nextServer.get<StoriesResponse>("/stories/saved", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}