import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Game from './pages/game';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Game} exact />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
