import React from 'react';
import { Route, Switch } from 'react-router';
import CreateNew from './containers/EditContainer';
import Home from './containers/HomeContainer';
import Header from './containers/HeaderContainer';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create-new" component={CreateNew} />
      <Route component={Home} />
    </Switch>
    <div>这里是footer</div>
  </div>
);

export default routes
