/* eslint-disable consistent-return */
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BlogArticlesService from '../../services/blog-articles-service';
import ArticleForm from '../articleForm/articleForm';
import routs from '../../routs/routs';

function CreateArticle() {
  const article = new BlogArticlesService();
  const navigate = useNavigate();
  const loader = async (data) => {
    const token = localStorage.getItem('token');
    const res = await article.createArticle(token, data);
    if (res) {
      return navigate(`${routs.articles}/${res.article.slug}`);
    }
  };
  return <ArticleForm formTitle="Create article" action={loader} />;
}

const mapStateToProps = (state) => ({
  data: state.articlesReducer.anArticle,
});

export default connect(mapStateToProps)(CreateArticle);
