import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

import ArticleItem from '../articleItem/articleItem';
import * as actions from '../../actions/articleActions';

import style from './articleList.module.scss';

function ArticleList({ data, asyncGetGlobalArticles }) {
  const { globalArticles, actualPage, totalPage } = data;
  const item = globalArticles.map((article) => {
    const { ...itemProps } = article;
    return (
      <Link key={article.slug} to={`/article/${article.slug}`}>
        <ArticleItem {...itemProps} />
      </Link>
    );
  });
  return (
    <>
      <ul className={style.articleList}>{item}</ul>
      <div className={style.footer}>
        <Pagination current={actualPage} total={totalPage} onChange={asyncGetGlobalArticles} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.articlesReducer,
});

export default connect(mapStateToProps, actions)(ArticleList);
