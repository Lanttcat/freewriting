import React from 'react'
import { Route, Switch } from 'react-router'
import CreateNew from './components/Edit'
import Home from './components/Home';
import Header from './components/Header';

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
