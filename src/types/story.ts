import { Category } from "./category";

export interface Story {
  id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: string;
  date: string;
  favoriteCount: number;
}
