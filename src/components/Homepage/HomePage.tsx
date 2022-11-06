import React, { useEffect } from 'react';
import { getNewsTS, getOneNewsTS } from '../../store/reducers/newsReducer';
import { News } from '../News';
import { selectAllNews, selectNews } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks';
import { Button } from '@mui/material';

export const HomePage = () => {
  const allNews = useAppSelector(selectAllNews);
  const news = useAppSelector(selectNews);

  const dispatch = useAppDispatch();

  useEffect(() => {
    allNews.slice(0, 100).forEach((id) => {
      dispatch(getOneNewsTS(id));
    });
  }, [allNews, dispatch]);

  const updatePages = () => dispatch(getNewsTS());

  return (
    <div>
      <Button
        variant="text"
        component="span"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={updatePages}
      >
        update Page
      </Button>
      <ol type="1" start={1}>
        {news
          .slice(0, 100)
          .sort((a, b) => b.time - a.time)
          .map((oneNews, i) => (
            <li key={i}>
              <News oneNews={oneNews} />
            </li>
          ))}
      </ol>
    </div>
  );
};
