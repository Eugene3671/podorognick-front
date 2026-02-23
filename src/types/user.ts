export interface User {
  _id: string;
  name: string;
  email: string;
  description: string;
  avatarUrl: string;
  articlesAmount: number;
  savedStories: string[];
  createdAt?: string;
  updatedAt?: string;
}
