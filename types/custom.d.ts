declare module 'weixin-js-sdk';
declare module 'qs';
declare module 'crypto-js';
declare module 'crypto-js/aes';
declare module 'crypto-js/enc-utf8';
declare module 'crypto-js/mode-ecb';
declare module 'crypto-js/pad-pkcs7';

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
  tt: any;
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
  isTT: boolean;
  isCSH: boolean;
}
