import { combineReducers, createStore } from 'redux';
import tableReducer from './table_reducer';

let reducers = combineReducers({
  table: tableReducer,
});

let store = createStore(reducers);

export default store;
