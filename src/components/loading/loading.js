import { Space, Spin } from 'antd';

import style from './loading.module.scss';

function Loading() {
  return (
    <div className={style.loading}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
}

export default Loading;
