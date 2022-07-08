import BASE from './lib/base';
import PV from './lib/pv';
import HTTP from './lib/http-request';
import ERROR from './lib/err';
import PERFORMANCE from './lib/performance';

const transitionOptions = (_options, options) => {
  const {
    requestUrl,
    appName,
    appCode,
    appVersion,
    ext,
    debug,
    pv = {},
    performance = {},
    error = {},
    event = {},
  } = options;
  if (!requestUrl) throw Error('请传入requestUrl参数');
  if (!appName) throw Error('请传入appName参数');
  const tOptions = { ..._options };
  tOptions.requestUrl = requestUrl;
  tOptions.appName = appName;
  tOptions.appCode = appCode;
  tOptions.appVersion = appVersion;
  tOptions.ext = ext;
  tOptions.debug = debug;
  if (typeof pv === 'boolean') {
    tOptions.pvCore = pv;
    tOptions.pvHashtag = pv;
  } else {
    tOptions.pvCore = Boolean(pv.core);
    tOptions.pvHashtag = Boolean(pv.server);
  }
  if (typeof performance === 'boolean') {
    tOptions.performanceCore = performance;
    tOptions.performanceFirstResource = performance;
    tOptions.performanceServer = performance;
  } else {
    tOptions.performanceCore = Boolean(performance.core);
    tOptions.performanceFirstResource = Boolean(performance.firstResource);
    tOptions.performanceServer = Boolean(performance.server);
  }
  if (typeof error === 'boolean') {
    tOptions.errorCore = error;
    tOptions.errorServer = error;
  } else {
    tOptions.errorCore = Boolean(error.core);
    tOptions.errorServer = Boolean(error.server);
  }

  if (typeof event === 'boolean') {
    tOptions.eventCore = event;
    tOptions.eventUnload = event;
  } else {
    tOptions.eventCore = Boolean(event.core);
    tOptions.eventUnload = Boolean(event.unload);
  }
  return tOptions;
};
const traceInit = (options = {}) => {
  const tOptions = {
    requestUrl: '', // 请求地址
    appName: '', // 应用名称
    appCode: '', // 应用code
    appVersion: '', // 应用版本
    ext: '', // 自定义全局附加参数
    debug: false, // 是否开启触发事件时控制台输出
    pvCore: false, // 页面跳转-是否自动发送页面跳转相关数据
    pvHashtag: false, // 页面跳转-浏览器的动作发生时(例如浏览器的回退按钮)是否监听hash变化,如果是hash路由请开启此开关
    performanceCore: false, // 性能数据-是否采集静态资源、接口的相关数据
    performanceFirstResource: false, // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
    performanceServer: false, // 接口请求-是否采集接口请求(成功的才会采集)
    errorCore: false, // 是否采集异常数据(ps: 资源引入错误,promise错误,控制台输出错误)
    errorServer: false, // 接口请求-是否采集报错接口数据
    eventCore: false, // 页面点击-是否采集点击事件
    eventUnload: false, // 页面卸载-是否在页面卸载时采集页面状态信息
  };
  // 将传过来的参数转换
  const initOptions = transitionOptions(tOptions, options);
  BASE.init(initOptions);
  PV.init(initOptions);
  HTTP.init(initOptions);
  ERROR.init(initOptions);
  PERFORMANCE.init(initOptions);
};

/* eslint no-constructor-return: "error" */
export default class Trace {
  static instance = null;

  constructor(config) {
    if (!Trace.instance) {
      traceInit(config);
      this.setCustomerId = BASE.setCustomerId;
      this.setUserUuid = BASE.setUserUuid;
      this.traceError = ERROR.traceError;
      this.tracePerformance = PERFORMANCE.tracePerformance;
      this.tracePageView = PV.tracePageView;
      Trace.instance = this;
    }
  }

  // 构造一个广为人知的接口，供用户对该类进行实例化
  static getInstance(config) {
    if (!this.instance) {
      this.instance = new Trace(config);
    }
    return this.instance;
  }
}
// export default {
//   init,
//   ...methods,
// };
