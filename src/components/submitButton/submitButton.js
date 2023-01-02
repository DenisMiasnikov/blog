import React from 'react';

import style from './submitButton.module.scss';

export default function SubmitButton(props) {
  const { text } = props;
  return (
    <button type="submit" className={style.submitButton}>
      {text}
    </button>
  );
}
