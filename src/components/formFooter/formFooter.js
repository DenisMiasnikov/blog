import React from 'react';
import { Link } from 'react-router-dom';

import style from './formFooter.module.scss';

export default function FormFooter(props) {
  const { text, link, linkText } = props;
  return (
    <div className={style.container}>
      <span className={style.footerText}>
        {text}
        <Link className={style.footerLink} to={link}>
          {linkText}
        </Link>
        .
      </span>
    </div>
  );
}
