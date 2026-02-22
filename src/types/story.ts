import { Category, User } from "./category";

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: User;
  date: string;
  favoriteCount: number;
}
