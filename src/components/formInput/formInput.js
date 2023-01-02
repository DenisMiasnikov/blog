import React from 'react';

import InputError from '../inputError';

import style from './formInput.module.scss';

export default function FormInput(props) {
  const { title, placeholder, name, reg, errors } = props;
  const actClassName = () => {
    if (errors) {
      return `${style.formInput} ${style.invalidFormInput}`;
    }
    return `${style.formInput}`;
  };
  const error = errors ? <InputError message={errors.message} /> : null;
  return (
    <label className={style.formTitle}>
      {title}
      <input className={actClassName()} type="text" name={name} placeholder={placeholder} {...reg} />
      {error}
    </label>
  );
}
