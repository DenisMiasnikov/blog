import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as actions from '../../actions/articleActions';

import style from './article.module.scss';

function Article({ data, asyncGetAnArticle }) {
  const { id } = useParams();
  const { anArticle } = data;
  const { slug } = anArticle;
  if (id !== slug) {
    asyncGetAnArticle(id);
  }
  if (anArticle.length !== 0) {
    const { title, description, tagList, favoritesCount, author, body } = anArticle;
    const { username, image } = author;
    return (
      <div className={style.article}>
        <div className={style.articleItem}>
          <div className={style.articleContent}>
            <div className={style.articleHeader}>
              <h6 className={style.articleTitle}>{title}</h6>
              <span className={style.articleRate}>{favoritesCount}</span>
            </div>
            <ul className={style.tagList}>
              <li className="tagItem">
                <span className={style.tagName}>{tagList[0]}</span>
              </li>
            </ul>
            <p className={style.articleTextPrewiev}>{description}</p>
          </div>
          <div className={style.articleInfo}>
            <div className={style.articleInfoItem}>
              <span className={style.articleUserName}>{username}</span>
              <span className={style.articleDate}>March 5, 2020 </span>
            </div>
            <img src={image} alt="userPhoto" className={style.userPhoto} />
          </div>
          <p className="article Text">{body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.articlesReducer,
});

export default connect(mapStateToProps, actions)(Article);
