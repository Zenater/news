import React, { useEffect } from 'react';
import { getOneNews } from '../../store/reducers/newsReducer';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { AccordionDetails } from '@material-ui/core';
import s from './NewsPage.module.css';
import { selectNews } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks';
import { Button } from '@mui/material';
import { Comments } from '../comments/Comments';

export const NewsPage = () => {
  const news = useAppSelector(selectNews);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  let newsList;
  if (id) {
    const el = news.find((n) => n.id === +id);
    if (el) newsList = el;
  }

  const updateListComments = () => {
    if (id) {
      dispatch(getOneNews(+id));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getOneNews(+id));
    }
  }, [dispatch, id]);
  return (
    <>
      {!!newsList && (
        <div className={s.container}>
          <Button
            variant="text"
            component="span"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={updateListComments}
          >
            update comments
          </Button>
          <NavLink to={'/'}>
            <button className={s.backHome}>Back to home page</button>
          </NavLink>
          <div className={s.menu}>
            <div className={s.title}>{newsList.title.toUpperCase()}</div>
            <div className={s.menu}>
              <a href={newsList.url}>{newsList.url} </a>
            </div>
            <div>
              By:<span className={s.subtitles}>{newsList.by}</span>
              Date:{' '}
              <span className={s.subtitles}>
                <Moment unix format="MMM, DD YYYY • hh:mm a">
                  {newsList.time}
                </Moment>
              </span>
              number of comments:
              <span className={s.subtitles}> {newsList.kids && newsList.kids.length}</span>
            </div>
          </div>
          <AccordionDetails style={{ padding: '0 0 20px 0', display: 'inline' }}>
            <div>
              {newsList.kids && newsList.kids.length ? (
                <Comments commentIds={newsList.kids} />
              ) : (
                <p className={s.notComments}>comments not created</p>
              )}
            </div>
          </AccordionDetails>
        </div>
      )}
    </>
  );
};
