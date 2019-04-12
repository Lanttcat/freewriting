import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from "react-redux"
import {applyMiddleware, compose, createStore} from 'redux'
import App from './App'
import {defaultConfig} from "./config/defaultConfig";
import './index.css';
import createRootReducer from './reducers/reducers';
import registerServiceWorker from './registerServiceWorker';
import {getUserConfig, recordUserUser} from "./util/storageUserConfig";

const initialState = { configReducer: getUserConfig() || defaultConfig };
const history = createBrowserHistory();
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      // ... other middlewares ...
    ),
  ),
);

initWebSite();

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

function initWebSite() {
  recordUserUser();
}
