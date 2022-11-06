import {AppThunk} from '../store';
import {Dispatch} from 'redux';
import {listAPI, NewsType} from '../../api/api';
import {handleServerAppError} from '../../common/utils/error-utils';
import {setAppStatus} from './appReducer';

export type NewsInitialStateType = {
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

export const newsReducer = (state: NewsInitialStateType = initialState, action: NewsActionType): NewsInitialStateType => {
    switch (action.type) {
        case 'NEWS/SET-ONE-NEWS':
            return {...state, dataNews: [...state.dataNews, action.news]};
        case 'NEWS/SET-COMMENTS':
            return {...state, dataComments: {...state.dataComments, [action.comment.id]: action.comment}};
        case 'NEWS/SET-NEWS':
            return {...state, allNews: [...action.allNews]};
        default:
            return state;
    }
};
// actions
export const addOneNews = (news: NewsType) => ({type: 'NEWS/SET-ONE-NEWS', news} as const);
export const addAllNews = (allNews: number[]) => ({type: 'NEWS/SET-NEWS', allNews} as const);
export const addComment = (comment: NewsType) => ({type: 'NEWS/SET-COMMENTS', comment} as const);

export const getOneNews = (storyId: number): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        let res = await listAPI.getStory(storyId);
        dispatch(addOneNews(res.data));
        dispatch(setAppStatus('succeeded'));
    } catch (e: any) {
        handleServerAppError(e, dispatch);
    }
};
export const getNews = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        let res = await listAPI.getAllNews();
        dispatch(addAllNews(res.data));
        dispatch(setAppStatus('succeeded'));
    } catch (e: any) {
        handleServerAppError(e, dispatch);
    }
};
export const getComment = (commentId: number): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        let res = await listAPI.getComment(commentId);
        dispatch(addComment(res.data));
        dispatch(setAppStatus('succeeded'));
    } catch (e: any) {
        handleServerAppError(e, dispatch);
    }
};
// types
export type NewsActionType =
    | ReturnType<typeof addOneNews>
    | ReturnType<typeof addAllNews>
    | ReturnType<typeof addComment>;
