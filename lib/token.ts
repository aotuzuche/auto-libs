import at from 'at-js-bridge';
import Cookie from 'js-cookie';
import qs from 'qs';
import Mini from './mini';
import Search from './search';
/* tslint:disable:no-magic-numbers */

const token = '_app_token_';
const consoleToken = '_app_console_token_';
const oldConsoleToken = 'auto_system_token';
const consoleInfoToken = '_app_console_userinfo_';
const oldConsoleInfoToken = 'auto_system_userData';
const openId = '_app_openId_';
const unionId = '_app_unionId_';
const virtualNo = '_app_virtualNo_';
const memNo = '_app_memNo_';
const atMiniProgram = '_app_atMiniProgram_';

const ls = window.localStorage;
const ss = window.sessionStorage;

// token的操作方法
const getToken = () => ls.getItem(token);
const setToken = (e: string) => ls.setItem(token, e);
const clearToken = () => ls.removeItem(token);

// 获取管理后台token方法，即jwt
const getConsoleToken = () => ls.getItem(consoleToken);
const setConsoleToken = (e: string) => ls.setItem(consoleToken, e);
const clearConsoleToken = () => {
  ls.removeItem(oldConsoleToken);
  ls.removeItem(consoleToken);
};

// 获取管理后台登录cookie
const getConsoleCookie = () => Cookie.get(consoleToken);
const setConsoleCookie = (e: string) => Cookie.set(consoleToken, e);
const clearConsoleCookie = () => {
  Cookie.remove(oldConsoleToken);
  Cookie.remove(consoleToken);
};

// openId 操作方法
const getOpenId = () => ss.getItem(openId);
const setOpenId = (e: string) => ss.setItem(openId, e);
const clearOpenId = () => ss.removeItem(openId);

// unionId 操作方法
const getUnionId = () => ss.getItem(unionId);
const setUnionId = (e: string) => ss.setItem(unionId, e);
const clearUnionId = () => ss.removeItem(unionId);

// virtualNo 操作方法
const getVirtualNo = () => ss.getItem(virtualNo);
const setVirtualNo = (e: string) => ss.setItem(virtualNo, e);
const clearVirtualNo = () => ss.removeItem(virtualNo);

// memNo 操作方法
const getMemNo = () => ss.getItem(memNo);
const setMemNo = (e: string) => ss.setItem(memNo, e);
const clearMemNo = () => ss.removeItem(memNo);

// atMiniProgramd 操作方法
const getAtMiniProgram = () => {
  const val = (ss.getItem(atMiniProgram) || 'false').toLocaleLowerCase();
  if (val === 'true') {
    return true;
  }
  return false;
};
const setAtMiniProgram = (e: string) => ss.setItem(atMiniProgram, e);

const initToken = async (ignore?: () => boolean) => {
  if (ignore && ignore()) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if ((window as any).isApp) {
      at.user.getToken().then(t => {
        if (t) {
          setToken(t);
          resolve(void 0);
        } else {
          clearToken();
          reject(new Error('token is empty'));
        }
      });
    } else {
      let token = getToken();
      if (Search.exist('token') && Search.exist('atMiniProgram')) {
        token = Search.getDefault('token', '');
      }

      if (token && String(token).length > 20) {
        setToken(token);
        resolve(void 0);
      } else {
        clearToken();
        reject(new Error('token is empty'));
      }
    }
  });
};

/**
 * 跳转到登录页面
 * app: 打开原生登录模块
 * h5: 跳转到通用登录页面
 */
interface ItoLogin {
  success?: () => void;
  cancel?: () => void;
  isBind?: boolean;
}

const toLogin = (appParams?: ItoLogin) => {
  clearToken();

  if ((window as any).isApp) {
    at.user.login().then(res => {
      if (res.status === 'success') {
        setToken(res.token);
        if (appParams && appParams.success) appParams.success();
        else window.location.reload();
      } else if (res.status === 'cancel') {
        if (appParams && appParams.cancel) appParams.cancel();
      }
    });
  } else if (window.isMiniProgram) {
    Mini.authLogin(window.location.href);
  } else {
    window.location.href = `/m/login/?${qs.stringify({
      redirect: window.location.href,
    })}`;
  }
};

// 跳转管理后台登录
const toConsoleLogin = () => {
  clearConsoleToken();
  const search = {
    redirect: window.location.href,
  };
  window.location.href = '/system/login/?' + qs.stringify(search);
};

const getConsoleLoginInfo = () => {
  const value = window.localStorage.getItem(consoleInfoToken);
  const oldValue = window.localStorage.getItem(oldConsoleInfoToken);
  const emptyObj = {};

  try {
    return value ? JSON.parse(value) : oldValue ? JSON.parse(oldValue) : emptyObj;
  } catch (error) {
    return emptyObj;
  }
};

export {
  getToken,
  setToken,
  clearToken,
  getConsoleToken,
  setConsoleToken,
  clearConsoleToken,
  initToken,
  toLogin,
  toConsoleLogin,
  getOpenId,
  setOpenId,
  clearOpenId,
  getUnionId,
  setUnionId,
  clearUnionId,
  getVirtualNo,
  setVirtualNo,
  clearVirtualNo,
  getMemNo,
  setMemNo,
  clearMemNo,
  getAtMiniProgram,
  setAtMiniProgram,
  getConsoleCookie,
  setConsoleCookie,
  clearConsoleCookie,
  getConsoleLoginInfo,
};
