import React from 'react';
import { useNavigate } from 'react-router';
import Skeleton from '@/components/skeleton';
import style from './index.module.less';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Skeleton isVisible={false}>
      <div className={style.content}>
        <div
          className={style.item}
          onClick={() => { navigate('/flow'); }}
        >
          zz
        </div>
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
