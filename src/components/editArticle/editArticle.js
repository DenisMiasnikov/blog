import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ArticleForm from '../articleForm/articleForm';
import * as actions from '../../actions/articleActions';

function EditArticleForm({ asyncEditArticle, asyncGetAnArticle, data }) {
  const { articlesReducer, loginReducer } = data;
  const { anArticle } = articlesReducer;
  // const { isLogged } = loginReducer;
  const { id } = useParams();
  if (anArticle.length === 0) {
    asyncGetAnArticle(id);
  } else if (anArticle.length !== 0) {
    return <ArticleForm formTitle="Edit article" article={anArticle} action={asyncEditArticle} />;
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps, actions)(EditArticleForm);
