import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../loading';
import ArticleItem from '../articleItem/articleItem';
import * as actions from '../../actions/articleActions';

function Article({ article, user, asyncGetAnArticle, asyncUnFavoriteAnArticle, asyncFavoriteAnArticle, loading }) {
  const token = localStorage.getItem('token');
  const { anArticle, actualPage } = article;
  const { id } = useParams();

  useEffect(() => {
    asyncGetAnArticle(id, token);
  }, [asyncGetAnArticle, id, token]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <ArticleItem
          article={anArticle}
          user={user}
          like={asyncFavoriteAnArticle}
          unlike={asyncUnFavoriteAnArticle}
          id={id}
          token={token}
          page={actualPage}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  article: state.articlesReducer,
  loading: state.articlesReducer.loading,
  user: state.loginReducer,
});

export default connect(mapStateToProps, actions)(Article);
