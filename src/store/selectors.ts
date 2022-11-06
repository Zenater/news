import { RootState } from './store';

export const selectNews = (state: RootState) => state.news.dataNews;
export const selectAllNews = (state: RootState) => state.news.allNews;
export const selectError = (state: RootState) => state.app.error;
export const selectStatus = (state: RootState) => state.app.status;
