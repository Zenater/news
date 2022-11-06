import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { AppActionType, setAppError, setAppStatus } from '../../store/reducers/appReducer';

export const handleServerAppError = (error: Error | AxiosError, dispatch: Dispatch<AppActionType>) => {
  const errorMessage = axios.isAxiosError(error)
    ? (error.response?.data as { error: string }).error
    : error.message + ', more details in the console';
  dispatch(setAppError(errorMessage));
  dispatch(setAppStatus('failed'));
};
