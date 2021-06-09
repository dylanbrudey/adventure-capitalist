import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Article from './pages/article';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/article/:id" component={Article} exact />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
