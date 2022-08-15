import React from 'react';

const Home = React.lazy(
  () => import(/* webpackChunkName: "home" */ '@/pages/home'),
);

const routes = [
  {
    element: <Home />,
    path: '/',
  },
];
export default routes;
