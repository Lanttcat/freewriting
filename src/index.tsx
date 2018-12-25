import {routerMiddleware} from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from "react-redux"
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux'
import App from './App'
import createRootReducer from './reducers/reducers';

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
  (
    <AppContainer>
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    </AppContainer>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
