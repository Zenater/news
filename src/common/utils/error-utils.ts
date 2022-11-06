import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { AppActionType, setAppErrorAC, setAppStatusAC } from '../../store/reducers/appReducer';

export const handleServerAppError = (error: Error | AxiosError, dispatch: Dispatch<AppActionType>) => {
  const errorMessage = axios.isAxiosError(error)
    ? (error.response?.data as { error: string }).error
    : error.message + ', more details in the console';
  dispatch(setAppErrorAC(errorMessage));
  dispatch(setAppStatusAC('failed'));
};
