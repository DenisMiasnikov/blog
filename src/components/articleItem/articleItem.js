import React from 'react';

import style from './articleItem.module.scss';
import photo from './photo.svg';

export default function ArticleItem(props) {
  // console.log(props);
  const { title, description, tagList, favoritesCount, author } = props;
  const { username, image } = author;
  return (
    <li className={style.articleItem}>
      <div className={style.articleContent}>
        <div className={style.articleHeader}>
          <h6 className={style.articleTitle}>{title}</h6>
          <span className={style.articleRate}>{favoritesCount}</span>
        </div>
        <ul className={style.tagList}>
          <li className={style.tagItem}>
            <span className={style.tagName}>{tagList[0]}</span>
          </li>
        </ul>
        <p className={style.articleText}>{description}</p>
      </div>
      <div className={style.articleInfo}>
        <div className={style.articleInfoItem}>
          <span className={style.articleUserName}>{username}</span>
          <span className={style.articleDate}>March 5, 2020 </span>
        </div>
        <img src={image} alt="userPhoto" className={style.userPhoto} />
      </div>
    </li>
  );
}
