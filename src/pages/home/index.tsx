import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import Skeleton from '@/components/skeleton';
import style from './index.module.less';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Skeleton isVisible={false}>
      <div className={style.content}>
        <Button
          type="link"
          // className={style.item}
          onClick={() => {
            navigate('/flow');
          }}
        >
          zz
        </Button>
        <div>sssss</div>
      </div>
      <div>
        <div>sssss</div>
        <div>sssss</div>
      </div>
    </Skeleton>
  );
};
export default Home;
