import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import format from 'date-fns/format';
import { nanoid } from 'nanoid';

import TagButton from '../tagButton';
import Loading from '../loading';
import ArticleItem from '../articleItem/articleItem';
import * as actions from '../../actions/articleActions';

import style from './article.module.scss';

function Article({ article, user, asyncGetAnArticle, asyncUnFavoriteAnArticle, asyncFavoriteAnArticle, loading }) {
  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    asyncGetAnArticle(id, token);
  }, [asyncGetAnArticle, id, token]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <ArticleItem
          article={article}
          user={user}
          like={asyncFavoriteAnArticle}
          unlike={asyncUnFavoriteAnArticle}
          id={id}
          token={token}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  article: state.articlesReducer.anArticle,
  loading: state.articlesReducer.loading,
  user: state.loginReducer,
});

export default connect(mapStateToProps, actions)(Article);
