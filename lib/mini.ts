import qs from 'qs';

// 小程序相关方法

// 返回上一个页面
export const navigateBack = () => {
  let key = 0;
  if (window && window.my && window.my.navigateBack) {
    key++;
    window.my.navigateBack();
  }

  if (window && window.wx && window.wx.miniProgram && window.wx.miniProgram.navigateBack) {
    key++;
    window.wx.miniProgram.navigateBack();
  }

  if (key === 0) {
    window.history.back();
  }
};

// 跳转原生页面
export const navigateTo = (url: string) => {
  if (window && window.my && window.my.navigateTo) {
    window.my.navigateTo({ url });
  }

  if (window && window.wx && window.wx.miniProgram && window.wx.miniProgram.navigateTo) {
    window.wx.miniProgram.navigateTo({ url });
  }
};

// 跳转原生页面(关闭当前页面)
export const redirectTo = (url: string) => {
  if (window && window.my && window.my.redirectTo) {
    window.my.redirectTo({ url });
  }

  if (window && window.wx && window.wx.miniProgram && window.wx.miniProgram.redirectTo) {
    window.wx.miniProgram.redirectTo({ url });
  }
};

// 跳转原生页面(关闭当前所有页面)
export const reLaunch = (url: string) => {
  if (window && window.my && window.my.reLaunch) {
    window.my.reLaunch({ url });
  }

  if (window && window.wx && window.wx.miniProgram && window.wx.miniProgram.reLaunch) {
    window.wx.miniProgram.reLaunch({ url });
  }
};

// 打开小程序的webview
export const openWebview = (url: string, query?: Record<string, any>) => {
  if (!url) {
    return;
  }

  let baseUrl = '/pages/pageCommon/webView/index';
  const split = url.split('?');
  let params: any = query;
  if (split[1]) {
    params = { ...params, ...qs.parse(split[1]) };
  }

  baseUrl = `${baseUrl}?urlParams${JSON.stringify({
    src: split[0].indexOf('http') === 0 ? split[0] : window.location.origin + split[0],
    paramsObj: params,
  })}`;

  navigateTo(baseUrl);
};
