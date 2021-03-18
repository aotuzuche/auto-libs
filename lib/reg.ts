import { getMiniProgramEnv } from './miniprogram';

interface MiniEnv {
  isAlipay?: boolean;
  isWeapp?: boolean;
  isJD?: boolean;
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

// 是否是京东客户端
const isJD = ua.indexOf('jdapp') > -1;

// 是否是ios
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

// 验证姓名格式
const isUserName = (name: string) => {
  const reg = /^[\u4e00-\u9fa5]|[a-zA-Z]$/;
  return reg.test(name);
};

// 验证护照号格式
const isPassCard = (num: string) => {
  const reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/;
  return reg.test(num);
};

// 验证回乡证号格式
const isHomeReturnPermit = (num: string) => {
  const reg = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/;
  return reg.test(num);
};

// 验证台胞证号格式
const isTaiwanCompatriotPermit = (num: string) => {
  const reg = /^(?:(830000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX])|\d{10}[DAB])$/;
  return reg.test(num);
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

// 验证图形验证码格式
const isImgCode = (str: string) => {
  const reg = /^[a-zA-Z0-9]{4}$/;
  return reg.test(str);
}

// 身份证
const isIDCard = (str: string) => {
  const reg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
  return reg.test(str);
};

const isMiniJD = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isJD;
};

const isMiniWX = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isWeapp;
};

const isMiniAlipay = async () => {
  const result: MiniEnv = await getMiniProgramEnv();
  return result.isMiniProgram && result.isAlipay;
};

export default {
  isApp,
  isWX,
  isJD,
  isAlipay,
  isiOS,
  isAndroid,
  isBaidu,
  isWXWork,
  isMobile,
  isUserName,
  isPassCard,
  isHomeReturnPermit,
  isTaiwanCompatriotPermit,
  isTel,
  isEmail,
  isIDCard,
  isMiniWX,
  isMiniAlipay,
  isImgCode,
  isMiniJD,
};
