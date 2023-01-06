import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import { nanoid } from 'nanoid';

import TagButton from '../tagButton';

import style from './articleItem.module.scss';

export default function ArticleItem(props) {
  const { article, user, like, unlike, token, id } = props;
  const { slug, favorited, createdAt } = article;
  const { isLogged } = user;
  const created = createdAt ? format(new Date(createdAt), 'PP') : null;

  const location = useLocation();
  const position = location.pathname === '/article';

  const onClick = () => {
    console.log('click');
  };

  const onLike = () => {
    if (!isLogged) {
      return;
    }
    if (favorited) {
      unlike(token, slug);
    } else if (!favorited) {
      like(token, slug);
    }
  };

  if (article.length !== 0) {
    const { title, description, tagList, favoritesCount, author, body } = article;
    const { username, image } = author;
    const articleTitle = position ? (
      <Link to={`/article/${article.slug}`}>
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

    return (
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
              <img src={image} alt="userPhoto" className={style.userPhoto} />
            </div>
            {isLogged && id && (
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
