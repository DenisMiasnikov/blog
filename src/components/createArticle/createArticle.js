import React from 'react';
import { connect } from 'react-redux';

import ArticleForm from '../articleForm/articleForm';
import * as actions from '../../actions/articleActions';

function CreateArticle({ asyncCreateAnArticle }) {
  return <ArticleForm formTitle="Create article" action={asyncCreateAnArticle} />;
}

const mapStateToProps = (state) => ({
  data: state.articlesReducer.anArticle,
});

export default connect(mapStateToProps, actions)(CreateArticle);
