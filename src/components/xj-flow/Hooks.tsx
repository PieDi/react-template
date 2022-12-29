import {
  SetStateAction, Dispatch, useState,
} from 'react';
import { XJNode, XJEdge } from './type';

type OnChange<ChangesType> = (_changes: ChangesType[]) => void;
type NodeHooks = (_init: Array<XJNode>) =>
[Array<XJNode>, Dispatch<SetStateAction<Array<XJNode>>>, OnChange<Array<XJNode>>];

export const XJFlowInfo:{nodesInfo?: any; edgesInfo?: any;[key: string]: any} = {};

let nodesInfo:[Array<XJNode>, Dispatch<SetStateAction<Array<XJNode>>>, OnChange<Array<XJNode>>];

export const useNodesState:NodeHooks = (init) => {
  const [nodes, setNodes] = useState<Array<XJNode>>(init);
  const change = <T, >(_change: T): void => {};
  nodesInfo = [nodes, setNodes, change];
  // @ts-ignore
  XJFlowInfo.nodesInfo = nodesInfo;
  return nodesInfo;
};

type EdgeHooks = (_init: Array<XJEdge>) =>
[Array<XJEdge>, Dispatch<SetStateAction<Array<XJEdge>>>, OnChange<Array<XJEdge>>];

let edgesInfo:[Array<XJEdge>, Dispatch<SetStateAction<Array<XJEdge>>>, OnChange<Array<XJEdge>>];

export const useEdgesState:EdgeHooks = (init) => {
  const [edges, setEdges] = useState<Array<XJEdge>>(init);
  const change = <T, >(_change: T): void => {};
  edgesInfo = [edges, setEdges, change];
  // @ts-ignore
  XJFlowInfo.edgesInfo = edgesInfo;
  return edgesInfo;
};

export default {};
