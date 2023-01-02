import React from 'react';

import style from './inputError.module.scss';

export default function InputError(props) {
  const { message } = props;
  return (
    <div className={style.inputErrorMessage}>
      <p>{message}</p>
    </div>
  );
}
