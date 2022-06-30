import Skeleton from './skeleton';
import style from './index.module.less';

const BaseLayout = () => (
  <div className={style.base_layout}>
    <Skeleton isVisible>
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
export default BaseLayout;
