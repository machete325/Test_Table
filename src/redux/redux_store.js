import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import tableReducer from './table_reducer';

let reducers = combineReducers({
  table: tableReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(logger)));

export default store;
