import { useEffect, useMemo } from 'react';
import { XJFlowInstance } from './XJFlowConfig';

type GraphType = ['Dot', {radius?: number}] | ['Rectangle', {width?: number; height: number}] | 'Blank';
type Anchor = {
  position: 'Left' | 'Top' | 'Right' | 'Bottom';
  offset?: number;
  graph?: GraphType;
}
interface Props {
  nodeID: string;
  id: string;
  anchorInfo?: Anchor
}
const Handle = (props: Props) => {
  const { nodeID, anchorInfo, id } = props;
  const anchor = useMemo(() => {
    if (anchorInfo?.position) {
      // @ts-ignore
      let tAnchor = [];
      switch (anchorInfo.position) {
      case 'Left':
        tAnchor = [0, 0.5, 0, 0];
        if (anchorInfo.offset) tAnchor = tAnchor.concat([0, anchorInfo.offset]);
        break;
      case 'Top':
        tAnchor = [0.5, 0, 0, 0];
        if (anchorInfo.offset) tAnchor = tAnchor.concat([anchorInfo.offset, 0]);
        break;
      case 'Right':
        tAnchor = [1, 0.5, 0, 0];
        if (anchorInfo.offset) tAnchor = tAnchor.concat([0, anchorInfo.offset]);
        break;
      case 'Bottom':
        tAnchor = [0.5, 1, 0, 0];
        if (anchorInfo.offset) tAnchor = tAnchor.concat([anchorInfo.offset, 0]);
        break;
      default: break;
      }
      // @ts-ignore
      return tAnchor;
    }
    return [0.5, 1, 0, 0]; // x y dx dy offsetX offsetY
  }, [anchorInfo]);

  const endpoint = useMemo(() => {
    if (anchorInfo?.graph) {
      if (anchorInfo?.graph === 'Blank') return 'Blank';
      if (anchorInfo?.graph[0] === 'Dot') {
        return [anchorInfo.graph[0],
        // @ts-ignore
          { radius: anchorInfo.graph[1]?.radius || 7 }];
      }
      if (anchorInfo?.graph[0] === 'Rectangle') {
        return [anchorInfo.graph[0],
        // @ts-ignore
          { width: anchorInfo.graph[1]?.width || 14, height: anchorInfo.graph[1]?.height || 14 }];
      }
    }
    return ['Dot', { radius: 7 }];
  }, [anchorInfo]);

  useEffect(() => {
    XJFlowInstance.ready(() => {
      XJFlowInstance.addEndpoint(nodeID, {
        uuid: `${nodeID}-${id}`,
        id: `${nodeID}-${id}`,
        // @ts-ignore
        anchor,
        // @ts-ignore
        endpoint,
        isSource: true,
        isTarget: true,
        cssClass: 'xj-handle',
        maxConnections: 1, // 只能限制 target
        connector: 'Bezier',
      });
    });
  }, [id, nodeID, anchor, endpoint]);
  return null;
};
export default Handle;
