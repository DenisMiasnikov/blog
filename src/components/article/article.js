import React from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import TagButton from '../tagButton';
import * as actions from '../../actions/articleActions';

import style from './article.module.scss';

function Article({ article, user, asyncGetAnArticle }) {
  const { id } = useParams();
  const { anArticle } = article;
  const { isLogged } = user;
  const { slug } = anArticle;
  const onClick = () => {
    console.log('click');
  };
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
            <p className="article Text">{body}</p>
          </div>
          <div className={style.articleInfo}>
            <div className={style.userInfo}>
              <div className={style.articleInfoItem}>
                <span className={style.articleUserName}>{username}</span>
                <span className={style.articleDate}>March 5, 2020 </span>
              </div>
              <img src={image} alt="userPhoto" className={style.userPhoto} />
            </div>
            {isLogged && (
              <div className={style.articleButtons}>
                <TagButton name="del-s" text="Delete" action={onClick} />
                <Link to={`/articles/${id}/edit`}>
                  <TagButton name="edit" text="Edit" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articlesReducer,
  user: state.loginReducer,
});

export default connect(mapStateToProps, actions)(Article);
