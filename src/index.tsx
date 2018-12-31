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
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  configReducer: {
    clearWordsTime: 5,
    minWordNumber: 500,
    minWriteTime: 600,
    writeModel: 'number',
  }
};
const store = createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  composeEnhancer(
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
