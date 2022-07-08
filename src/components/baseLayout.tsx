// import { useEffect, useRef } from 'react';
import Skeleton from './skeleton';
import style from './index.module.less';

// const HOC = (Component:any) => (props:any) => {
//   console.log(333, props);

//   useEffect(() => {
//     console.log('页面进入', Component);
//     return () => {
//       console.log('页面离开', Component);
//     };
//   }, []);

//   return <Component {...props} />;
// };

const BaseLayout = () => {
  console.log(4444);
  return (
    <div className={style.base_layout}>
      <Skeleton isVisible={false}>
        <div className={style.content}>
          <div className={style.item}>sssss</div>
          <div>sssss</div>
        </div>

        <div>
          <div>sssss</div>
          <div>sssss</div>
        </div>
      </Skeleton>
    </div>
  );
};
export default BaseLayout;
