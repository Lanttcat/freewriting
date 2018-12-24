import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import './index.css';
import registerServiceWorker from './registerServiceWorker';


import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers/reducers';
import routes from './route';

const history = createBrowserHistory();

const initialState = {};
const store = createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      { routes }
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
