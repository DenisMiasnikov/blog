/* eslint-disable consistent-return */
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import BlogArticlesService from '../../services/blog-articles-service';
import ArticleForm from '../articleForm/articleForm';
import Error from '../error';
import * as actions from '../../actions/articleActions';

function EditArticleForm({ asyncGetAnError, asyncGetAnArticle, data }) {
  const { articlesReducer } = data;
  const { anArticle, error } = articlesReducer;

  const article = new BlogArticlesService();
  const navigate = useNavigate();
  const { id } = useParams();
  const loader = (newData) => {
    const token = localStorage.getItem('token');
    article
      .updateArticle(token, id, newData)
      .then((res) => navigate(`/article/${res.article.slug}`))
      .catch(() => {
        asyncGetAnError();
      });
  };

  const errorContent = error ? <Error message="Sorry, you are not permitted to edit this article" /> : null;
  const content = !error ? <ArticleForm formTitle="Edit article" article={anArticle} action={loader} /> : null;

  if (anArticle.length === 0) {
    asyncGetAnArticle(id);
  } else if (anArticle.length !== 0) {
    return (
      <>
        {errorContent}
        {content}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps, actions)(EditArticleForm);
