import { instance } from './Instance/instance';

export type NewsType = {
  by: string;
  id: number;
  time: number;
  title: string;
  url: string;
  score: number;
  kids?: number[];
  text?: string;
};

export const listAPI = {
  getStory(storyId: number) {
    return instance.get<NewsType>(`item/${storyId}.json`);
  },
  getAllNews() {
    return instance.get<number[]>(`/topstories.json`);
  },
  getComment(commentId: number) {
    return instance.get<NewsType>(`item/${commentId}.json`);
  },
};
