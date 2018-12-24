import React from 'react'
import { Route, Switch } from 'react-router'
import App from './App'

const routes = (
  <div>
    {/*<NavBar />*/}
    <Switch>
      <Route exact={true} path="/" component={App} />
      <Route path="/counter" component={App} />
    </Switch>
  </div>
);

export default routes
