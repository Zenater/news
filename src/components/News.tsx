import React from 'react';
import { mapTime } from '../common/mappers/mapTime';
import { NavLink } from 'react-router-dom';
import { PATH } from './Routes/Navigates';
import { NewsType } from '../api/api';
import s from './NewsPage/NewsPage.module.css';

type PropsType = {
  oneNews: NewsType;
};

export const News: React.FC<PropsType> = React.memo(({ oneNews }) => {
  return (
    <>
      {oneNews && oneNews.url ? (
        <div>
          <div>
            <NavLink to={PATH.NEWS_PAGE + `/${oneNews.id}`} style={{ wordBreak: 'break-word', color: 'black' }}>
              {oneNews.title}
            </NavLink>
          </div>
          By: <span className={s.subtitles}>{oneNews.by}</span>
          Posted:<span className={s.subtitles}>{mapTime(oneNews.time)}</span>
          Rating:<span className={s.subtitles}>{oneNews.score}</span>
        </div>
      ) : (
        <p>{oneNews.title}</p>
      )}
    </>
  );
});
