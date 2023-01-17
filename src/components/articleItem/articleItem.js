import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import { nanoid } from 'nanoid';

import TagButton from '../tagButton';
import Error from '../error';
import BlogArticlesService from '../../services/blog-articles-service';
import routs from '../../routs/routs';
import * as action from '../../actions/articleActions';

import style from './articleItem.module.scss';

function ArticleItem(props) {
  const { article, user, like, unlike, token, id, data, asyncGetAnError, page } = props;
  const { error } = data;
  const { slug, favorited, createdAt } = article;
  const { isLogged } = user;
  const created = createdAt ? format(new Date(createdAt), 'PP') : null;

  const location = useLocation();
  const navigate = useNavigate();
  const position = location.pathname === routs.articles;

  const blog = new BlogArticlesService();

  const onClick = () => {
    blog
      .deleteArticle(token, slug)
      .then(() => {
        navigate(routs.articles);
      })
      .catch((e) => {
        asyncGetAnError(e);
      });
  };

  const onLike = () => {
    if (!isLogged) {
      return;
    }
    if (favorited) {
      unlike(token, slug, page);
    } else if (!favorited) {
      like(token, slug, page);
    }
  };

  if (article.length !== 0) {
    const { title, description, tagList, favoritesCount, author, body } = article;
    const { username, image } = author;
    const mySrc = image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    const articleTitle = position ? (
      <Link to={`${routs.articles}/${article.slug}`}>
        <h6 className={style.articleTitle}>{title}</h6>
      </Link>
    ) : (
      <h6 className={style.articleTitle}>{title}</h6>
    );
    const tags = tagList.map((tag) => (
      <li className={style.tagItem} key={nanoid()}>
        <span className={style.tagName}>{tag}</span>
      </li>
    ));
    const errorContent = error ? <Error message="Sorry, you are not permitted to delete this article" /> : null;
    const content = !error ? (
      <div className={style.article}>
        <div className={style.articleItem}>
          <div className={style.articleContent}>
            <div className={style.articleHeader}>
              {articleTitle}
              <label className={style.articleRateLabel}>
                {favoritesCount}
                <input type="checkbox" checked={favorited} className={style.articleRate} onChange={onLike} />
              </label>
            </div>
            <ul className={style.tagList}>{tags}</ul>
            <p className={style.articleTextPrewiev}>{description}</p>
            {!position && (
              <div className={style.articleText}>
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            )}
          </div>
          <div className={style.articleInfo}>
            <div className={style.userInfo}>
              <div className={style.articleInfoItem}>
                <span className={style.articleUserName}>{username}</span>
                <span className={style.articleDate}>{created} </span>
              </div>
              <img
                src={mySrc}
                alt="userPhoto"
                className={style.userPhoto}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = 'https://static.productionready.io/images/smiley-cyrus.jpg';
                }}
              />
            </div>
            {isLogged && id && (
              <div className={style.articleButtons}>
                <TagButton name="del-s" text="Delete" action={onClick} />
                <Link to={`${routs.articles}/${id}/edit`}>
                  <TagButton name="edit" text="Edit" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : null;
    return (
      <>
        {errorContent}
        {content}
      </>
    );
  }
}

const mapStsateToProps = (state) => ({
  data: state.articlesReducer,
});

export default connect(mapStsateToProps, action)(ArticleItem);
