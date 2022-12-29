import React, {
  useEffect, useCallback, useState, KeyboardEventHandler, MouseEventHandler,
} from 'react';
import { XJFlowInstance } from './XJFlowConfig';
import { XJNode, XJEdge } from './type';
import XJFlowNodeWidget from './XJFlowNodeWidget';
import { XJFlowInfo } from './Hooks';
import style from './index.module.less';

interface Props {
  nodes: Array<XJNode>;
  edges: Array<XJEdge>;
}
const XJFlow = (props: Props) => {
  const { nodes, edges } = props;
  const [isShift, setIsShift] = useState(false);
  useEffect(() => {
    XJFlowInstance.ready(() => {
      // edges.forEach((item) => {
      //   const con = { ...item };
      //   delete con.label;
      //   XJFlowInstance.connect({
      //     ...con,
      //     overlays: [
      //       ['Label', { // 标签参数设置
      //         label: item.label,
      //         location: 0.2,
      //         labelStyle: { color: 'red' },
      //       }],
      //     ],
      //   });
      // });
    });
  }, [edges]);
  useEffect(() => {
    // 请单点击一下连接线,
    XJFlowInstance.bind('click', (info, _event) => {
      // 取消所有连线的高亮颜色
      // @ts-ignore
      XJFlowInstance.select().setPaintStyle({ stroke: '#89BCDE' });
      // 设置当前连接线高亮
      // @ts-ignore
      info.setPaintStyle({ stroke: 'red' });
      _event.stopPropagation();
    });
    XJFlowInstance.bind('dblclick', (info, _event) => {
      if (_event) {
        // @ts-ignore
        XJFlowInstance.deleteConnection(info);
      }
      // XJFlowInstance.remove('1');
      _event.stopPropagation();
    });
    // XJFlowInstance.bind('beforeDrop', (info) => {
    //   return true;
    // });
    // 建立连接事件，更新到data 连线事件
    XJFlowInstance.bind('connection', (info, event) => {
      if (event) {
        // @ts-ignore
        const sourceId = info.sourceEndpoint.getUuid();
        // @ts-ignore
        const targetId = info.targetEndpoint.getUuid();
        const edgeInfo: XJEdge = {
          source: sourceId,
          target: targetId,
          uuids: [sourceId, targetId],
          label: 'ssss',
        };
        // @ts-ignore
        const setEdges = XJFlowInfo.edgesInfo[1];
        const temp = [...edges].concat(edgeInfo);
        if (setEdges) {
          setEdges(temp);
        }
      }
    });
    // 删除连接事件，更新到data
    XJFlowInstance.bind('connectionDetached', (info) => {
      // @ts-ignore
      const sourceId = info.sourceEndpoint.getUuid();
      // @ts-ignore
      const targetId = info.targetEndpoint.getUuid();
      console.log('222x', sourceId, targetId);

      // const index = edges.findIndex((item) => item.source === sourceId
      //   && item.target === targetId);
    });
    // //更改连接事件，更新到data。更改连接时也会触发connection事件
    XJFlowInstance.bind('connectionMoved', (info, event) => {
      console.log('🚀 ~ file: index.tsx ~ line 33 ~ XJFlowInstance.bind ~ event', info, event);
    });
  }, []);
  const selectCallback = useCallback((index:number, id: string) => {
    const currentNode = nodes[index];
    const setNodes = XJFlowInfo.nodesInfo[1];
    const temp = [...nodes];
    if (!isShift) {
      temp.forEach((item) => {
        item.select = false;
      });
      // @ts-ignore
      XJFlowInstance.clearDragSelection();
    }
    // @ts-ignore
    XJFlowInstance.addToDragSelection(id);
    temp.splice(index, 1, { ...currentNode, select: true });
    if (setNodes) {
      setNodes(temp);
    }
  }, [nodes, isShift]);
  const onClick = useCallback(() => {
    // @ts-ignore
    XJFlowInstance.clearDragSelection();
    const setNodes = XJFlowInfo.nodesInfo[1];
    if (setNodes) {
      // @ts-ignore
      XJFlowInstance.select().setPaintStyle({ stroke: '#89BCDE' });
      setNodes(nodes.map((item) => ({ ...item, select: false })));
    }
  }, [nodes]);
  const onKeyDown:KeyboardEventHandler<Element> = useCallback((e) => {
    if (e.keyCode === 16) setIsShift(true);
  }, []);
  const onKeyUp:KeyboardEventHandler<Element> = useCallback((e) => {
    if (e.keyCode === 16) setIsShift(false);
  }, []);
  const onMouseDown:MouseEventHandler<Element> = useCallback((e) => {
    console.log('🚀 ~ file: index.tsx ~ line 133 ~ constonMouseDown:MouseEventHandler<Element>=useCallback ~ e', e);
  }, []);
  const onMouseUp:MouseEventHandler<Element> = useCallback((e) => {
    // @ts-ignore
    console.log('🚀 ~ file: index.tsx ~ line 136 ~ constonMouseUp:MouseEventHandler<Element>=useCallback ~ e', e.currentTarget.dataset);
    // const dataset: DOMStringMap;
  }, []);
  return (
    <div
      className={style.xj_flow}
      id="xj-flow"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      data-id="xj_flow"
    >
      {
        nodes.map((item, index) => (
          <XJFlowNodeWidget
            nodeItem={item}
            index={index}
            key={item.id}
          />
        ))
      }
    </div>
  );
};
export default XJFlow;
