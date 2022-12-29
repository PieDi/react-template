import React, {
  useRef, useEffect, useCallback,
} from 'react';
import XJInput from './XJInput';
import { XJNode } from './type';
import { XJFlowInstance } from './XJFlowConfig';
import style from './index.module.less';

interface Props {
  nodeItem: XJNode;
  index: number;
  selectCallback?: (index:number, id: string) => void;
}
const XJFlowNodeWidget = (props: Props) => {
  const { nodeItem, index, selectCallback } = props;
  const el = useRef(null);
  useEffect(() => {
    if (el) {
      // @ts-ignore
      XJFlowInstance && XJFlowInstance.draggable(el.current, {
        grid: [1, 1],
        drag() {
          XJFlowInstance.repaintEverything();
        },
      });
    }
  }, []);
  const onClick = useCallback((e:React.MouseEvent) => {
    e.stopPropagation();
    if (selectCallback) selectCallback(index, nodeItem.id);
  }, [nodeItem, index, selectCallback]);

  return (
    <div
      draggable
      ref={el}
      className={style.xj_node_widget}
      data-key={nodeItem.id}
      title={nodeItem.label}
      id={nodeItem.id}
      // onMouseUp={onMouseUp}
      onClick={onClick}
      style={{
        left: `${nodeItem.left}px`,
        top: `${nodeItem.top}px`,
      }}
      data-value="xj-node-widget"
    >
      <XJInput node={nodeItem} />
    </div>
  );
};
export default XJFlowNodeWidget;
