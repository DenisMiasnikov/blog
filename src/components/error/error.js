import React from 'react';
import { Alert, Space } from 'antd';

import './error.css';

function Error(props) {
  const refreshPage = () => {
    window.location.reload();
  };

  const { message } = props;

  return (
    <div className="error">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert message={message} />
      </Space>
    </div>
  );
}

export default Error;
