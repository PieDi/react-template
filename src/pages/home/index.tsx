import React from 'react';
import Skeleton from '@/components/skeleton';
import style from './index.module.less';

export const Home = () => (
  <Skeleton isVisible={false}>
    <div className={style.content}>
      <div
        className={style.item}
        onClick={() => {}}
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
export default Home;
