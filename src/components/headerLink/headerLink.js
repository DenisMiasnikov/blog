import React from 'react';
import { Link } from 'react-router-dom';

import style from './headerLink.module.scss';

export default function HeaderLink(props) {
  const { text, to, border, green, small } = props;
  const actClass = () => {
    if (small) {
      if (border) {
        return `${style.logButton} ${style.border} ${style.small}`;
      }
      if (green) {
        return `${style.logButton} ${style.border} ${style.green} ${style.small}`;
      }
      return `${style.logButton} ${style.small}`;
    }
    if (border) {
      return `${style.logButton} ${style.border}`;
    }
    if (green) {
      return `${style.logButton} ${style.border} ${style.green}`;
    }
    return style.logButton;
  };
  return (
    <Link to={to} className={actClass()}>
      {text}
    </Link>
  );
}
