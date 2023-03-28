import React from 'react';
import { Button } from 'antd';
// import shortid from 'shortid';
// import { useNodesState, useEdgesState } from '@/components/xj-flow/Hooks';
// import XJFlow from '@/components/xj-flow';
import style from './index.module.less';

// const [nodes, setNodes, onNodesChange] = useNodesState([{
//   id: '1',
//   width: 200,
//   height: 200,
//   left: 20,
//   top: 20,
//   label: '1',
//   select: false,
// }, {
//   id: '2',
//   width: 200,
//   height: 200,
//   left: 400,
//   top: 20,
//   label: '2',
//   select: false,
// }]);
// const [edges, setEdges, onEdgesChange] = useEdgesState([]);

// const onClick = useCallback(() => {
//   setNodes([...nodes, {
//     id: shortid.generate(),
//     width: 200,
//     height: 200,
//     left: 200 * i,
//     top: 20,
//     label: '1',
//     select: false,
//   }]);
//   i += 1;
// }, [nodes, setNodes]);
export const Home = () => (
  <div className={style.content}>
    <Button>
      zz
    </Button>
    <div>sssss</div>
  </div>

);
export default Home;
