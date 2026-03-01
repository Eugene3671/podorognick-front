import { Story } from "@/src/types/story";
import { serverApi } from "./serverApi";

export async function getServerStoryById(storyId: string): Promise<Story> {
  const res = await serverApi.get<Story>(`/stories/${storyId}`);
  return res.data;
}
