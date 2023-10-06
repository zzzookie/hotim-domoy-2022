import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';

export default createStore(
  rootReducer,
  process.env.NODE_ENV === 'dev'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk),
);
