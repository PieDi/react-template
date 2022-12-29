import React, { useEffect } from 'react';
import { XJNode } from './type';
import Handle from './Handle';
import style from './index.module.less';

interface Props {
  node: XJNode
}
const XJInput = (props:Props) => {
  const { node } = props;
  useEffect(() => {
  }, []);

  return (
    <div
      className={style.xj_node}
      style={{
        width: `${node.width}px`,
        border: `${node.select ? '1px solid red' : '1px solid #333333'}`,
      }}
    >
      {node.id}
      <Handle nodeID={node.id} id="a" anchorInfo={{ position: 'Top' }} />
      <Handle nodeID={node.id} anchorInfo={{ position: 'Bottom' }} id="b" />
    </div>
  );
};
export default XJInput;
