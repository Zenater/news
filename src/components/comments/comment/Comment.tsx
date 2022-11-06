import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Comments } from '../Comments';
import { getCommentTS } from '../../../store/reducers/newsReducer';
import s from './Comment.module.css';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks';
import { Meta } from '../../Meta/Meta';

export const createMarkup = (markup: string) => ({
  __html: markup,
});

type PropsType = {
  comment: number;
};
export const Comment: React.FC<PropsType> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.news.dataComments[comment]);
  const [isChecked, setIsChecked] = useState(false);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    dispatch(getCommentTS(comment));
  }, [dispatch, comment]);

  const showCommentsHandler = () => {
    setIsChecked(!isChecked);
    setShowComments(!showComments);
  };

  const hideCommentsHandler = () => {
    setIsChecked(!isChecked);
    setShowComments(!showComments);
  };
  return (
    <div className={s.root}>
      {comment && comments && comments.text && (
        <>
          <Meta article={comments} />
          <Typography
            variant="body2"
            style={{
              textAlign: 'left',
              color: 'teal',
              margin: '10px',
              padding: '10px',
            }}
            dangerouslySetInnerHTML={createMarkup(comments.text)}
          />
          {showComments ? (
            comments.kids && (
              <p className={s.text} onClick={showCommentsHandler}>
                Show the following comments
              </p>
            )
          ) : (
            <p className={s.hide} onClick={hideCommentsHandler}>
              Hide comments
            </p>
          )}
          {isChecked && comments.kids && <Comments commentIds={comments.kids} />}
        </>
      )}
    </div>
  );
};
