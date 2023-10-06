import { combineReducers } from 'redux';
import advertsReducer from './adverts';
import filterReducer from './filter';
// import lastFoundReducer from './lastFound';
import lastPostsReducer from './lastPosts';
import foundReducer from './found';
import likeReducer from './like';
import labelReducer from './label';
import lostReducer from './lost';
import paramsReducer from './params';
import profileReducer from './profile';
import messageReducer from './message';

const rootReducer = combineReducers({
  adverts: advertsReducer,
  lastPosts: lastPostsReducer,
  // lastFounds: lastFoundReducer,
  found: foundReducer,
  lost: lostReducer,
  filtered: filterReducer,
  params: paramsReducer,
  profile: profileReducer,
  likes: likeReducer,
  label: labelReducer,
  message: messageReducer,
});
export default rootReducer;
