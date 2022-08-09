import React, { ReactElement } from 'react';
import style from './index.module.less';

interface Props {
  children: ReactElement
}
const BaseLayout = (props:Props) => {
  const { children } = props;
  return (
    <div className={style.base_layout}>
      <div>{children}</div>
    </div>
  );
};

export default BaseLayout;
