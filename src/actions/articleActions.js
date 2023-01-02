import BlogArticlesService from '../services/blog-articles-service';
import { getOffset } from '../utils/utils';

import * as types from './actionsType';

const total = (string) => Math.ceil(Number(string) / 20) * 10;

const article = new BlogArticlesService();

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

export const asyncGetGlobalArticles = (e) => async (dispatch) => {
  if (e) {
    dispatch(changePage(e));
    const res = await article.getGlobalRecent(getOffset(e));
    dispatch(getGlobalArticles(res));
  }
  if (!e) {
    const res = await article.getGlobalRecent();
    dispatch(getGlobalArticles(res));
  }
};

export const asyncGetAnArticle = (id) => async (dispatch) => {
  article.getAnArticle(id).then((anArticle) => {
    dispatch(getAnArticles(anArticle.article));
  });
};
