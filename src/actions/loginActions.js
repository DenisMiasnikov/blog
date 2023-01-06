import BlogUserService from '../services/blog-services';

import * as types from './actionsType';

const user = new BlogUserService();

export const startToFetch = () => ({
  type: types.START_TO_FETCH,
});

export const getAnError = (e) => ({
  type: types.GET_AN_ERROR,
  payload: e,
});

export const finishToFetch = () => ({
  type: types.FINISH_TO_FETCH,
});

export const userSingIn = (data) => ({
  type: types.USER_LOG_IN,
  payload: data,
});

export const userLogOut = () => {
  localStorage.removeItem('token');
  return {
    type: types.USER_LOG_OUT,
  };
};

export const setError = (data) => ({
  type: types.SET_ERROR,
});

export const asyncUserSingIn = (email, password, fn, fn2) => (dispatch) => {
  dispatch(startToFetch());
  user
    .singIn(email, password, fn)
    .then((userData) => {
      localStorage.setItem('token', userData.user.token);
      dispatch(userSingIn(userData.user));
      fn2();
    })
    .catch((err) => {
      dispatch(getAnError(err));
    });
};

export const asyncGetUser = (token) => (dispatch) => {
  user.getUser(token).then((userData) => {
    dispatch(userSingIn(userData.user));
  });
};

export const asyncUpdateUser = (token, data, fn) => (dispatch) => {
  user
    .updateUser(token, data, fn)
    .then((userData) => {
      localStorage.setItem('token', userData.user.token);
      dispatch(userSingIn(userData.user));
    })
    .catch(() => {
      dispatch(setError());
    });
};

export const asyncMakeUser = (data, fn) => (dispatch) => {
  user
    .singUp(data, fn)
    .then((userData) => {
      localStorage.setItem('token', userData.user.token);
      dispatch(userSingIn(userData.user));
    })
    .catch(() => {
      dispatch(setError());
    });
};
