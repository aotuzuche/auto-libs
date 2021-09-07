import axios, { AxiosAdapter, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { clearToken, getToken, toLogin } from './token';
import report from './utils/analyticsReport';
import getUtm from './utils/getUtm';

interface HttpConfig {
  resCode?: string;
  resMsg?: string;
  data?: any;
}

export interface ProcessEnv {
  [key: string]: string | undefined;
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

// 用户唯一id
let uuid = localStorage.getItem('_app_uuid_');
if (!uuid) {
  uuid = String(new Date().valueOf()) + Math.round(Math.random() * 9999);
  localStorage.setItem('_app_uuid_', uuid);
}

// 拦截多次请求弹出重复错误问题
// 目前整体看下来，只有200008这个场景会出现这种情况，其他类型的错误都会被catch掉
// 在同一批接口中统一传入相同的_xuuids_参数 最好是随机数
window._cblock_ = {};
let xuuids: string = '';

/**
 * 配置axios
 */

interface CustomRequestConfig extends AxiosRequestConfig {
  onLogin?: (code: string) => void;
  report?: boolean;
}

interface CustomAxiosInstance extends AxiosInstance {
  request<T = any>(config: CustomRequestConfig): AxiosPromise<T>;
}

export const http: CustomAxiosInstance = axios.create({
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
http.interceptors.request.use(config => {
  const token = getToken();
  const platform = (window as any).platform;
  const utm = getUtm();

  const method = (config.method as string).toLocaleLowerCase();
  if (token) {
    config.headers['Atzuche-Token'] = token;
  }
  if (method === 'get') {
    if (typeof config.params !== 'object') {
      config.params = {};
    }

    // 兼容appserver的接口，appserver的接口token需要带在参数中，post请求也是一样
    if (token) {
      config.params.token = token;
    }

    if (utm) {
      config.params.utmSource = utm.utm_source;
      config.params.utmMedium = utm.utm_medium;
      config.params.utmCampaign = utm.utm_campaign;
      config.params.utmTerm = utm.utm_term;
    }

    config.params.requestId = Number(new Date());
    if (platform) {
      config.params.h5Platform = platform;
    }
  }

  const methods: string[] = ['post', 'put', 'patch', 'delete'];
  if (methods.indexOf(method) > -1 && typeof config.data !== 'string') {
    if (token) {
      config.data.token = token;
    }

    if (utm) {
      config.data.utmSource = utm.utm_source;
      config.data.utmMedium = utm.utm_medium;
      config.data.utmCampaign = utm.utm_campaign;
      config.data.utmTerm = utm.utm_term;
    }

    config.data.requestId = Number(new Date());
    if (platform) {
      config.data.h5Platform = platform;
    }
  }

  xuuids = (config.params && config.params._xuuids_) || (config.data && config.data._xuuids_);
  if (xuuids && window._cblock_[xuuids] === void 0) {
    delete config.params._xuuids_;
    window._cblock_[xuuids] = false;
  }

  (config as any).____t = new Date().valueOf();

  return config;
});

/**
 * 接口响应拦截器，在接口响应之后
 */
http.interceptors.response.use(
  config => {
    // config data
    const cc = (config.config as any) || {};

    // report
    report(cc.report !== false && cc.____t && cc.url && cc.method, 'api/m', {
      m: cc.method,
      u: cc.url,
      p: window.location.origin + window.location.pathname,
      s: (new Date().valueOf() - cc.____t) / 1000,
      uu: uuid,
    });

    let strictModel = true; // 严格模式
    const data = config.data || {};

    // 目前的判断方式：因为resCode与resMsg是java端必给的字段，所以认为没有该两个字段时，走标准的http status模式
    if (typeof data.resCode !== 'undefined' && typeof data.resMsg !== 'undefined') {
      strictModel = false;
    }

    if (strictModel) {
      if (config.status >= 200 && config.status < 300) {
        return data;
      }

      if (config.status === 401) {
        if (cc.onLogin) {
          cc.onLogin('200008');
        } else {
          clearToken();
          if (!xuuids) {
            toLogin();
          } else {
            if (window._cblock_[xuuids] === false) {
              window._cblock_[xuuids] = true;
              toLogin();
            }
          }
        }
        return {};
      }

      // report error
      report(cc.report !== false && cc.url && cc.method, 'api_error/m', {
        m: cc.method,
        u: cc.url,
        p: window.location.origin + window.location.pathname,
        uu: uuid,
        s: config.status,
        err: JSON.stringify(data),
      });

      return Promise.reject(new HttpError(data.message || '', data));
    }

    // atcz java端的模式

    // 响应正常
    if (data.resCode === '000000') {
      return data.data;
    }

    if (data.resCode === '200008') {
      // 需要登录（没登录或登录过期）
      if (cc.onLogin) {
        cc.onLogin(data.resCode);
      } else {
        clearToken();
        if (!xuuids) {
          toLogin();
        } else {
          if (window._cblock_[xuuids] === false) {
            window._cblock_[xuuids] = true;
            toLogin();
          }
        }
      }
      return {};
    }

    if (data.resCode === '200101') {
      // 需要绑定
      if (cc.onLogin) {
        cc.onLogin(data.resCode);
      } else {
        clearToken();
        toLogin({ isBind: true });
      }
      return {};
    }

    // report error
    report(cc.report !== false && cc.url && cc.method && data.resCode === '999999', 'api_error/m', {
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
  error => {
    console.error('http:reject', error);

    if (error.response.status === 401) {
      clearToken();
      toLogin();
      return false;
    }

    const cc = error.config;
    const res = error.response || {};
    report(cc && cc.report !== false && res.status, 'api_error/m', {
      m: cc.method,
      u: cc.url,
      p: window.location.origin + window.location.pathname,
      uu: uuid,
      s: res.status,
      err: JSON.stringify(res.data),
    });

    // reject错误处理
    return Promise.reject(new HttpError(res.data && (res.data.message || '系统错误')));
  },
);

const httpCacheAdapter = (page: string, key: string, hour = 0) => {
  const adapter: AxiosAdapter = (conf: any) => {
    // 判断是否存在缓存数据
    const fullKey = `_auto_cache_${page}_${key}_`;
    let cache: string | null | undefined = void 0;
    let cacheJson: Record<string, any> = {};
    if (hour <= 0) {
      if (!(window as any)._auto_cache_) {
        (window as any)._auto_cache_ = {};
      } else {
        cache = (window as any)._auto_cache_[fullKey] ? '_' : void 0;
        cacheJson = (window as any)._auto_cache_[fullKey] || {};
      }
    } else {
      cache = localStorage.getItem(fullKey);
      cacheJson = cache ? JSON.parse(cache) : {};
      if (cacheJson.created && cacheJson.duration) {
        const horOffset = (new Date().valueOf() - cacheJson.created) / 1000 / 60 / 60;
        if (horOffset > cacheJson.duration) {
          localStorage.removeItem(fullKey);
          cache = null;
          cacheJson = {};
        }
      } else {
        cache = null;
      }
    }

    // 调用默认请求接口, 发送正常请求及返回
    if (!cache) {
      const newConf = { ...conf };
      delete newConf.adapter;
      return new Promise((resolve, reject) => {
        axios(newConf)
          .then(json => {
            const data = json.data || {};
            if (
              json.status === 200 &&
              data.resCode &&
              data.resMsg &&
              data.data &&
              data.resCode === '000000'
            ) {
              if (hour <= 0) {
                if (!(window as any)._auto_cache_) {
                  (window as any)._auto_cache_ = {};
                }
                (window as any)._auto_cache_[fullKey] = {
                  created: new Date().valueOf(),
                  response: data,
                  status: json.status,
                };
              } else {
                localStorage.setItem(
                  fullKey,
                  JSON.stringify({
                    created: new Date().valueOf(),
                    duration: hour,
                    response: data,
                    status: json.status,
                  }),
                );
              }
            }
            resolve(json);
          })
          .catch(err => reject(err));
      });
    }

    // 返回缓存数据
    return new Promise(resolve => {
      resolve({ data: cacheJson.response, status: cacheJson.status } as any);
    });
  };
  return adapter;
};

export { httpCacheAdapter };
