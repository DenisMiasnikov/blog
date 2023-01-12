import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import ArticleItem from '../articleItem/articleItem';
import Loading from '../loading';
import * as actions from '../../actions/articleActions';

import style from './articleList.module.scss';

function ArticleList({ article, user, asyncGetGlobalArticles, asyncUnFavoriteAnArticle, asyncFavoriteAnArticle }) {
  const token = localStorage.getItem('token');
  const { globalArticles, actualPage, totalPage, loading } = article;
  const { isLogged } = user;

  useEffect(() => {
    if (isLogged) {
      asyncGetGlobalArticles(1, token);
    }
    if (!isLogged) {
      asyncGetGlobalArticles(1);
    }
  }, [asyncGetGlobalArticles, isLogged, token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [actualPage]);

  const onChange = (e) => {
    if (token) {
      asyncGetGlobalArticles(e, token);
    }
    if (!token) {
      asyncGetGlobalArticles(e);
    }
  };

  const item = globalArticles.map((anArticle) => (
    <ArticleItem
      key={anArticle.slug}
      article={anArticle}
      user={user}
      like={asyncFavoriteAnArticle}
      unlike={asyncUnFavoriteAnArticle}
      token={token}
    />
  ));
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <ul className={style.articleList}>{item}</ul>
          <div className={style.footer}>
            <Pagination current={actualPage} total={totalPage} onChange={onChange} />
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  article: state.articlesReducer,
  user: state.loginReducer,
});

export default connect(mapStateToProps, actions)(ArticleList);
