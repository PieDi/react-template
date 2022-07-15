import Trace from './utils/trace';
import BaseLayout from './components/baseLayout';
import './static/style/normalize.css';

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
  return <BaseLayout />;
};

export default App;
