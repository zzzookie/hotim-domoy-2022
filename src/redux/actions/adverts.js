import {
  DELETE_LIKE,
  DELETE_PROFILEPOST,
  GET_ADVERTS,
  GET_FILTERED,
  GET_LAST_POSTS,
  GET_FOUND,
  GET_LIKES,
  GET_LOST,
  GET_PARAMS,
  GET_PROFILE,
  MAKE_LIKE,
} from '../constants/constants';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAdverts = (data) => ({ type: GET_ADVERTS, payload: data });
export const getLastPosts = (data) => ({ type: GET_LAST_POSTS, payload: data });
export const getLost = (data) => ({ type: GET_LOST, payload: data });
export const getFound = (data) => ({ type: GET_FOUND, payload: data });
export const getFiltered = (data) => ({ type: GET_FILTERED, payload: data });
export const getParams = (data) => ({ type: GET_PARAMS, payload: data });
export const getProfile = (data) => ({ type: GET_PROFILE, payload: data });
export const deleteProfilePost = (id) => ({ type: DELETE_PROFILEPOST, payload: id });
export const makeLike = (data) => ({ type: MAKE_LIKE, payload: data });
export const deleteLike = (id) => ({ type: DELETE_LIKE, payload: id });
export const getLikes = (data) => ({ type: GET_LIKES, payload: data });

export const getAdvertsThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/adverts`);
    const result = await response.json();
    dispatch(getAdverts(result));
  } catch (error) {
    console.log(error);
  }
};

export const getProfileThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/lk`, { credentials: 'include' });
    const result = await response.json();
    dispatch(getProfile(result));
  } catch (error) {
    console.log(error);
  }
};

export const getLastPostsThunk = (qty) => async (dispatch) => {
  try {
    const limit = qty || 8;
    const response = await fetch(`${BASE_URL}/adverts/last?limit=${limit}`);
    if (response.ok) {
      const result = await response.json();
      dispatch(getLastPosts(result));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredThunk = (body) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/adverts/filter`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(getFiltered(result));
  }
};
export const getParamsThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/adverts/params`);
    const result = await response.json();
    dispatch(getParams(result));
  } catch (error) {
    console.log(error);
  }
};
export const deleteProfilePostThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/lk/${id}`, { method: 'delete', credentials: 'include' });
    const result = await response.json();
    if (response.ok) {
      dispatch(deleteProfilePost(id));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getLikesThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/lk/likes`, { credentials: 'include' });
    if (response.ok) {
      const result = await response.json();
      dispatch(getLikes(result));
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteLikeThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/lk/likes/${id}`, { method: 'delete', credentials: 'include' });
    if (response.status === 200) {
      dispatch(deleteLike(id));
    }
  } catch (error) {
    console.log(error);
  }
};
export const makeLikeThunk = (obj) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/lk/likes/${obj.id}`, { credentials: 'include' });
    if (response.ok) {
      const result = await response.json();
      dispatch(makeLike(result));
    }
  } catch (error) {
    console.log(error);
  }
};
