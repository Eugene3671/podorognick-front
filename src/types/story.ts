import { User } from "./user";
import { Category } from "./category";

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category | string;
  ownerId: User | string;
  date: string;
  favoriteCount: number;
}

export interface CreateStoryFormValues {
  title: string;
  article: string;
  category: string;
  img: File | null;
  date: string;
}
