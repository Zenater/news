import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import { listAPI, NewsType } from '../../api/api';
import { handleServerAppError } from '../../common/utils/error-utils';
import { setAppStatusAC } from './appReducer';

export type GetStories = {
  allNews: number[];
  dataComments: {
    [key: number]: NewsType;
  };
  dataNews: NewsType[];
};

const initialState = {
  allNews: [],
  dataNews: [],
  dataComments: {},
};

export const newsReducer = (state: GetStories = initialState, action: NewsActionType): GetStories => {
  switch (action.type) {
    case 'NEWS/SET-LIST':
      return { ...state, dataNews: [...state.dataNews, action.news] };
    case 'NEWS/SET-COMMENTS':
      return { ...state, dataComments: { ...state.dataComments, [action.comment.id]: action.comment } };
    case 'NEWS/SET-NEWS':
      return { ...state, allNews: [...action.allNews] };
    default:
      return state;
  }
};
// actions
export const addOneNews = (news: NewsType) => ({ type: 'NEWS/SET-LIST', news } as const);
export const addAllNews = (allNews: number[]) => ({ type: 'NEWS/SET-NEWS', allNews } as const);
export const addComment = (comment: NewsType) => ({ type: 'NEWS/SET-COMMENTS', comment } as const);

export const getOneNewsTS =
  (storyId: number): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'));
      let res = await listAPI.getStory(storyId);
      dispatch(addOneNews(res.data));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e: any) {
      handleServerAppError(e, dispatch);
    }
  };
export const getNewsTS = (): AppThunk => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'));
    let res = await listAPI.getAllNews();
    dispatch(addAllNews(res.data));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e: any) {
    handleServerAppError(e, dispatch);
  }
};
export const getCommentTS =
  (commentId: number): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'));
      let res = await listAPI.getComment(commentId);
      dispatch(addComment(res.data));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e: any) {
      handleServerAppError(e, dispatch);
    }
  };
// types
export type NewsActionType =
  | ReturnType<typeof addOneNews>
  | ReturnType<typeof addAllNews>
  | ReturnType<typeof addComment>;
