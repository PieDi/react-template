import React from 'react';

const Home = React.lazy(
  () => import(/* webpackChunkName: "home" */ '@/pages/home'),
);
const Flow = React.lazy(
  () => import(/* webpackChunkName: "flow" */ '@/pages/flow'),
);

const routes = [
  {
    element: <Home />,
    path: '/',
  },
  {
    element: <Flow />,
    path: '/flow',
  },
];
export default routes;
