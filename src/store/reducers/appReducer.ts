export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'succeeded' as RequestStatusType,
  error: null as null | string,
};

export type AppInitialStateType = typeof initialState;

export const appReducer = (state = initialState, action: AppActionType): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);

export type AppActionType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>;
