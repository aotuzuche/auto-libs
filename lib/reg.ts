import { getMiniProgramEnv } from './miniprogram';

interface MiniEnv {
  isAlipay?: boolean;
  isWeapp?: boolean;
  isSwan?: boolean;
  isMiniProgram?: boolean;
}

const ua = navigator.userAgent;

// 是否是企业微信
const isWXWork = /wxwork/gi.test(ua);

// 是否是app
const isApp = /atzuche/gi.test(ua);

// 是否是微信
const isWX = !isWXWork && /MicroMessenger/gi.test(ua);

// 是否是支付宝客户端
const isAlipay = /AlipayClient/gi.test(ua);

// 是否
const isiOS = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);

// 是否是安卓
const isAndroid = !isiOS && (/Android/.test(ua) || /Adr/.test(ua));

// 是否是百度app
const isBaidu = /baiduboxapp/gi.test(ua);

// 是否是手机号
const isMobile = (str: string) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(str);
};

// 固定电话
const isTel = (str: string) => {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  return reg.test(str);
};

// 邮箱
const isEmail = (str: string) => {
  const reg = /[\w]+@[a-zA-Z0-9]+(\.[A-Za-z]{2,4}){1,2}/;
  return reg.test(str);
};

// 身份证
const isIDCard = (str: string) => {
  const reg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
  return reg.test(str);
};

const isMiniWX = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isWeapp;
};

const isMiniAlipay = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isAlipay;
};

// 是否是百度小程序
const isMiniBaidu = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isSwan;
};

export {
  isApp,
  isWX,
  isAlipay,
  isiOS,
  isAndroid,
  isBaidu,
  isWXWork,
  isMobile,
  isTel,
  isEmail,
  isIDCard,
  isMiniWX,
  isMiniBaidu,
  isMiniAlipay,
};
