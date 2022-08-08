import React from 'react';
import { RouteObject } from 'react-router-dom';

const Home = React.lazy(
  () => import(/* webpackChunkName: "home" */ '@/pages/home'),
);
const Flow = React.lazy(
  () => import(/* webpackChunkName: "flow" */ '@/pages/flow'),
);

const routes: Array<RouteObject> = [
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
