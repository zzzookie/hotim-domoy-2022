import { SEND_MESSAGE } from '../constants/constants';

export const sendMessage = (data) => ({ type: SEND_MESSAGE, payload: data });

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendMessageThunk = (body, id) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/message/${id}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ body }),
    credentials: 'include',
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(sendMessage(result));
  }
};
