/* eslint-disable consistent-return */
/* eslint-disable indent */
import React from 'react';
import { Popconfirm } from 'antd';

import style from './tagButton.module.scss';

export default function TagButton(props) {
  const { action, text, name } = props;
  const actClass = () => {
    switch (name) {
      case 'add':
        return style.add;
      case 'del':
        return style.del;
      case 'edit':
        return style.edit;
      case 'del-s':
        return `${style.del} ${style.small}`;
      default:
    }
  };
  if (name === 'del-s') {
    return (
      <Popconfirm
        placement="rightTop"
        // title="Delete the task"
        title="Are you sure to delete this article?"
        // description="Are you sure to delete this article?"
        okText="Yes"
        cancelText="No"
        onConfirm={action}
      >
        <button type="button" className={actClass()}>
          {text}
        </button>
      </Popconfirm>
    );
  }
  return (
    <button onClick={action} type="button" className={actClass()}>
      {text}
    </button>
  );
}
