import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import {
  clearConsoleCookie,
  clearConsoleToken,
  getConsoleLoginInfo,
  getConsoleToken,
  toConsoleLogin,
} from './token';
import analyticsReport from './utils/analyticsReport';

const uuid = getConsoleLoginInfo().loginId || localStorage.getItem('_app_uuid_');

interface HttpConfig {
  resCode?: string;
  resMsg?: string;
  data?: any;
}

class HttpError extends Error {
  public msg: string;
  public name = 'HttpError';
  public data: any;
  public code = '0';
  public constructor(message: string, data?: HttpConfig) {
    super(message);

    this.msg = message;
    if (data) {
      this.data = data ? (data.data ? data.data : data) : null;
      this.code = data.resCode || '';
    }
  }
  public toString() {
    return this.message;
  }
}

/**
 * 配置axios
 */

export const httpConsole = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json;version=3.0;compress=false',
    'Content-Type': 'application/json;charset=utf-8',
  },
  data: {},
});

/**
 * 请求拦截器，在发起请求之前
 */
httpConsole.interceptors.request.use(config => {
  const token = getConsoleToken();
  const utmSource = Cookie.get('utm_source');
  const utmMedium = Cookie.get('utm_medium');
  const utmCampaign = Cookie.get('utm_campaign');
  const utmTerm = Cookie.get('utm_term');

  const method = (config.method as string).toLocaleLowerCase();
  if (token) {
    config.headers.Authorization = token;
  }
  if (method === 'get') {
    if (typeof config.params !== 'object') {
      config.params = {};
    }

    // 兼容appserver的接口，appserver的接口token需要带在参数中，post请求也是一样
    if (token) {
      config.params.token = token;
    }
    if (utmSource) {
      config.params.utmSource = utmSource;
    }
    if (utmMedium) {
      config.params.utmMedium = utmMedium;
    }
    if (utmCampaign) {
      config.params.utmCampaign = utmCampaign;
    }
    if (utmTerm) {
      config.params.utmTerm = utmTerm;
    }

    config.params.requestId = Number(new Date());
  }

  const methods: string[] = ['post', 'put', 'patch', 'delete'];
  if (methods.indexOf(method) > -1 && typeof config.data !== 'string') {
    if (token) {
      config.data.token = token;
    }
    if (utmSource) {
      config.data.utmSource = utmSource;
    }
    if (utmMedium) {
      config.data.utmMedium = utmMedium;
    }
    if (utmCampaign) {
      config.data.utmCampaign = utmCampaign;
    }
    if (utmTerm) {
      config.data.utmTerm = utmTerm;
    }
    config.data.requestId = Number(new Date());
  }

  (config as any).____t = new Date().valueOf();

  return config;
});

/**
 * 接口响应拦截器，在接口响应之后
 */
httpConsole.interceptors.response.use(
  config => {
    let strictModel = true; // 严格模式
    const data = config.data || {};

    // config data
    const cc = (config.config as any) || {};

    analyticsReport(cc.____t && cc.url && cc.method, 'api/system', {
      m: cc.method,
      u: cc.url,
      p: window.location.origin + window.location.pathname,
      s: (new Date().valueOf() - cc.____t) / 1000,
      uu: uuid,
    });

    // 目前的判断方式：因为resCode与resMsg是java端必给的字段，所以认为没有该两个字段时，走标准的http status模式
    if (typeof data.resCode !== 'undefined' && typeof data.resMsg !== 'undefined') {
      strictModel = false;
    }

    if (strictModel) {
      if (config.status >= 200 && config.status < 300) {
        return data;
      } else {
        if (config.status === 401) {
          clearConsoleCookie();
          clearConsoleToken();
          toConsoleLogin();
          return false;
        }

        // report error
        analyticsReport(cc.url && cc.method, 'api_error/system', {
          m: cc.method,
          u: cc.url,
          p: window.location.origin + window.location.pathname,
          uu: uuid,
          s: config.status,
          err: JSON.stringify(data),
        });
        return Promise.reject(new HttpError(data.message || '', data));
      }
    }

    // atcz java端的模式

    // 响应正常
    if (data.resCode === '000000') {
      return data.data;
    }
    // 需要登录（没登录或登录过期）
    else if (data.resCode === '200008') {
      clearConsoleCookie();
      clearConsoleToken();
      toConsoleLogin();
      return false;
    }

    // report error
    analyticsReport(cc.url && cc.method && data.resCode === '999999', 'api_error/system', {
      m: cc.method,
      u: cc.url,
      p: window.location.origin + window.location.pathname,
      uu: uuid,
      s: config.status,
      err: data.resMsg || data.msg || data.message,
    });

    // reject错误处理
    return Promise.reject(new HttpError(data.resMsg || data.msg || data.message, data));
  },
  (error: AxiosError) => {
    console.error('http:reject', error);

    if (error.response && error.response.status === 401) {
      clearConsoleCookie();
      clearConsoleToken();
      toConsoleLogin();
      return false;
    }

    const cc = error.config;
    const res = (error.response as any) || {};
    analyticsReport(cc && res.status, 'api_error/system', {
      m: cc.method,
      u: cc.url,
      p: window.location.origin + window.location.pathname,
      uu: uuid,
      s: res.status,
      err: JSON.stringify(res.data),
    });

    // reject错误处理
    const { data } = error.response || {};
    const { message = '系统错误', msg, resMsg } = data || {};
    return Promise.reject(new HttpError(resMsg || msg || message));
  },
);
