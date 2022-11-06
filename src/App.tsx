import React, { useEffect } from 'react';
import s from './App.module.css';
import { getNews } from './store/reducers/newsReducer';
import { Navigates } from './components/Routes/Navigates';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './common/hooks/customHooks';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { selectAllNews, selectStatus } from './store/selectors';
import { CircularProgress } from '@mui/material';

export const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const allNews = useAppSelector(selectAllNews);

  useEffect(() => {
    dispatch(getNews());
    const interval = setInterval(() => dispatch(getNews()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!allNews) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={s.app}>
      <div className={s.container}>
        <ErrorSnackbar />
        <Header />
        {status === 'loading' && <LinearProgress color="success" />}
        <Navigates />
        <Footer />
      </div>
    </div>
  );
};
