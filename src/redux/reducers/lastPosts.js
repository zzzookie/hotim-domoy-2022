import { GET_LAST_POSTS } from "../constants/constants";

const initialState = {};

const lastPostsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LAST_POSTS:
      return payload;
    default:
      return state;
  }
};
export default lastPostsReducer;
