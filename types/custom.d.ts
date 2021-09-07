declare module 'weixin-js-sdk';
declare module 'qs';
declare module 'crypto-js';

interface Window {
  dpr: number;
  rem: number;
  AMap: any;
  gio: any;
  my: any;
  wx: any;
  jd: any;
  swan: any;
  atzuche: any;
  NativeJsBridge: any;
  _cblock_: any;
}

interface Window {
  isWX: boolean;
  isApp: boolean;
  isAlipay: boolean;
  isSmallSwan: boolean;
  isJD: boolean;
  isJDMP: boolean;
  isMiniProgram: boolean;
  isiOS: boolean;
  isAndroid: boolean;
}
