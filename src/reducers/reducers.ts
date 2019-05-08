import { connectRouter } from 'connected-react-router';
import {History} from 'history';
import { combineReducers } from 'redux';
import { configReducer } from './configureStore';


export default (history: History) => combineReducers({
  configReducer,
  router: connectRouter(history),
})
