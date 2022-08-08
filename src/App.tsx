import React, { Suspense } from 'react';
import {
  BrowserRouter,
  useRoutes,
} from 'react-router-dom';
import Trace from './utils/trace';
import routes from './routes';
import BaseLayout from './components/baseLayout';
import './static/style/normalize.css';

const Routers = () => useRoutes(routes);
const App = () => {
  const trace = new Trace({
    requestUrl: 'http://172.15.224.10:33199/trackweb/tra',
    appName: 'chengxh',
    event: true,
    performance: true,
    pv: true,
    error: true,
  });
  window.trace = trace;
  console.log(33333, Routers);
  return (
    <BrowserRouter>
      <BaseLayout>
        <Suspense fallback={<div>loading...</div>}>
          <Routers />
        </Suspense>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default App;
