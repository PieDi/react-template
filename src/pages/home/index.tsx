import React, { useCallback, useState } from 'react';
import { Button } from 'antd/lib/radio';
import shortid from 'shortid';
import { useNodesState, useEdgesState } from '@/components/xj-flow/Hooks';
import XJFlow from '@/components/xj-flow';
import style from './index.module.less';

let i = 3;
const genRandomName = () => {
  console.log('in genRandomName', Math.random());
  return `${Math.random()}`;
};

const useName = () => {
  // 每点一次按钮，genRandomName 就会执行一次
  const [name, setName] = useState(() => {
    console.log('in genRandomName', Math.random());
    return `${Math.random()}`;
  });
  console.log(33333, name);
  return {
    name,
    setName,
  };
};

export const Home = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([{
    id: '1',
    width: 200,
    height: 200,
    left: 20,
    top: 20,
    label: '1',
    select: false,
  }, {
    id: '2',
    width: 200,
    height: 200,
    left: 400,
    top: 20,
    label: '2',
    select: false,
  }]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onClick = useCallback(() => {
    setNodes([...nodes, {
      id: shortid.generate(),
      width: 200,
      height: 200,
      left: 200 * i,
      top: 20,
      label: '1',
      select: false,
    }]);
    i += 1;
  }, [nodes, setNodes]);

  const [count, setCount] = useState(0);
  const { name, setName } = useName();

  return (
    // <Skeleton isVisible={false}>
    //   <div className={style.content}>
    //     <Button
    //       type="link"
    //       // className={style.item}
    //       onClick={() => {
    //         navigate('/flow');
    //       }}
    //     >
    //       zz
    //     </Button>
    //     <div>sssss</div>
    //   </div>
    //   <div className={style.content}>
    //     <div className={`${style.item} ${style.item_1}`}>sssss</div>
    //     <div className={`${style.item} ${style.item_2}`}>sssss</div>
    //   </div>
    // </Skeleton>
    <div className={style.content}>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
      {/* <XJFlow nodes={nodes} edges={edges} /> */}
      <div>{count}</div>
      <div>{name}</div>
    </div>

  );
};
export default Home;
