import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PageNotFound } from '../Page404/PageNotFound';
import { HomePage } from '../Homepage/HomePage';
import { NewsPage } from '../NewsPage/NewsPage';

export const PATH = {
  NEWS_PAGE: '/newsPage',
  ERROR_PAGE: '/404',
};

export const Navigates = () => {
  return (
    <Switch>
      <Route exact path={PATH.ERROR_PAGE} render={() => <PageNotFound />} />
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route exact path={PATH.NEWS_PAGE + `/:id`} render={() => <NewsPage />} />
      <Redirect from="*" to={PATH.ERROR_PAGE} />
    </Switch>
  );
};
