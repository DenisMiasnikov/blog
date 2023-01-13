/* eslint-disable indent */
/* eslint-disable default-param-last */
import BlogArticlesService from '../services/blog-articles-service';
import BlogFavoritesService from '../services/blog-favorites-service';
import { getOffset } from '../utils/utils';

import * as types from './actionsType';

const total = (string) => Math.ceil(Number(string) / 20) * 10;

const article = new BlogArticlesService();
const like = new BlogFavoritesService();

export const startToFetch = () => ({
  type: types.START_TO_FETCH,
});

export const getAnError = () => ({
  type: types.GET_AN_ERROR,
});

export const getGlobalArticles = (data) => ({
  type: types.GET_GLOBAL_ARTICLES,
  articles: data.articles,
  totalPage: total(data.articlesCount),
});

export const getAnArticles = (data) => ({
  type: types.GET_AN_ARTICLE,
  payload: data,
});

export const changePage = (e) => ({
  type: types.CHANGE_ACTUAL_PAGE,
  payload: e,
});

export const asyncGetGlobalArticles = (e, token) => (dispatch) => {
  dispatch(startToFetch());
  if (e && token) {
    dispatch(changePage(e));
    article
      .getGlobalRecent(token, getOffset(e))
      .then((res) => {
        dispatch(getGlobalArticles(res));
      })
      .catch((err) => {
        dispatch(getAnError(err));
      });
  }
  if (!e && token) {
    dispatch(changePage(1));
    article
      .getGlobalRecent(token)
      .then((res) => {
        dispatch(getGlobalArticles(res));
      })
      .catch((err) => {
        dispatch(getAnError(err));
      });
  }
  if (e && !token) {
    dispatch(changePage(e));
    article
      .getGlobalRecent(undefined, getOffset(e))
      .then((res) => {
        dispatch(getGlobalArticles(res));
      })
      .catch((err) => {
        dispatch(getAnError(err));
      });
  }
  if (!e && !token) {
    dispatch(changePage(1));
    article
      .getGlobalRecent()
      .then((res) => {
        dispatch(getGlobalArticles(res));
      })
      .catch((err) => {
        dispatch(getAnError(err));
      });
  }
};

export const asyncGetAnArticle = (id, token) => (dispatch) => {
  dispatch(startToFetch());
  article
    .getAnArticle(id, token)
    .then((anArticle) => {
      dispatch(getAnArticles(anArticle.article));
    })
    .catch((e) => {
      dispatch(getAnError(e));
    });
};

export const asyncFavoriteAnArticle = (token, id) => async (dispatch) => {
  like.favoriteArticle(token, id).then((anArticle) => {
    dispatch(getAnArticles(anArticle.article));
    article.getGlobalRecent(token).then((res) => {
      dispatch(getGlobalArticles(res));
    });
  });
};

export const asyncUnFavoriteAnArticle = (token, id) => async (dispatch) => {
  like.unFavoriteArticle(token, id).then((anArticle) => {
    dispatch(getAnArticles(anArticle.article));
    article.getGlobalRecent(token).then((res) => {
      dispatch(getGlobalArticles(res));
    });
  });
};

export const asyncDeleteAnArticle = (token, id) => async (dispatch) => {
  article.deleteArticle(token, id).catch((e) => {
    dispatch(getAnError(e));
  });
};

export const asyncGetAnError = () => async (dispatch) => {
  dispatch(getAnError());
};
