import React from 'react';
import Moment from 'react-moment';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { NewsType } from '../../api/api';
import s from './Meta.module.css';

type PropsType = {
  article: NewsType;
};

export const Meta: React.FC<PropsType> = ({ article }) => {
  return (
    <List className={s.container}>
      {article && article.by && (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={article.by}
              secondary={
                <Typography component="span" variant="body2">
                  <Moment unix format="MMM, DD YYYY • hh:mm a">
                    {article.time}
                  </Moment>
                  <br />
                </Typography>
              }
            />
          </ListItem>
        </>
      )}
    </List>
  );
};
