import React from 'react';
import { Route, Switch } from 'react-router';
// import CreateNew from './containers/EditContainer';
import Home from './containers/HomeContainer';
import Header from './containers/HeaderContainer';
import Feedback from './containers/FeedbackContainer';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      {/*<Route path="/create-new" component={CreateNew} />*/}
      <Route path="/feedback" component={Feedback} />
    </Switch>
    {/*<div>这里是footer</div>*/}
  </div>
);

export default routes
