# AUTO-libs 凹凸公用库

1. [公用样式和脚本引入](#公用样式和脚本引入)
   - [reset 样式](#reset-样式)
   - [flexible 布局脚本](#flexible-布局脚本)
   - [Date 扩展](#date-扩展)
   - [Input 扩展](#input-扩展)
2. [cdn 地址](#cdn-地址)
3. [go 跳转](#go-跳转)
   - [取还车地址](#取还车地址)
   - [支付](#支付)
   - [身份认证](#身份认证)
   - [驾照认证](#驾照认证)
4. [http](#http)
   - [自定义拦截器](#自定义拦截器)
5. [AS 统计埋点](#as-统计埋点)
   - [页面编号 事件号和携带参数](#页面编号-事件号和携带参数)
6. [WX](#wx)
   - [自定义参数](#自定义参数)
   - [自定义按钮](#自定义按钮)
7. [token 相关](#token-相关)
   - [token](#token)
   - [登录](#登录)
   - [openId](#openid)
   - [unionId](#unionid)
   - [virtualNo](#virtualno)
   - [memNo](#memno)
8. [时间转换](#时间转换)
   - [offsetHours](#offsetHours)
   - [offsetDays](#offsetDays)
   - [stringToDate](#stringToDate)

## 公用样式和脚本引入

### reset 样式

```js
import 'auto-libs/build/styles/reset';
```

### flexible 布局脚本

```js
import 'auto-libs/build/scripts/flexible';
```

### Date 扩展

```js
import 'auto-libs/build/scripts/date';
```

### Input 扩展

```js
import 'auto-libs/build/scripts/inputEvents';
```

## cdn 地址

```js
import { cdn } from 'auto-libs';
```

## go 跳转

```js
import { go } from 'auto-libs';
```

### 取还车地址

```js
const { address } = go

address({
  redirectUrl: string
  redirectParam: string
  locationInfo?: {
    address?: string;
    name?: string;
    code?: string;
    lat?: string;
    ng?: string;
    telPrefix?: string;
  }
  telPrefix?: string
  cityCode?: string
  keyword?: string
  servicePoint?: 1 | 0
  searchTip?: string
  selectCity?: 1 | 0
  selectCityTip?: string
  isOnDoor?: 1 | 0
})
```

### 支付

```js
const { pay } = go

pay({
  token: string
  orderNo: string
  payKind: string
  redirect_url: string
})

```

### 身份认证

```js
const { identityAuth } = go

identityAuth({
  redirect?: string
})
```

### 驾照认证

```js
const { dirverAuth } = go

dirverAuth({
  redirect?: string
})
```

## http

```js
import { http } from 'auto-libs';

http.request({
  method: 'get',
  url: `/wechatgw/jsapi/ticket`,
});
```

### 自定义拦截器

```js
import { http } from 'auto-libs';

http.interceptors.request.use(config => {
  if (config.method === 'get') {
    if (typeof config.params !== 'object') {
      config.params = {};
    }

    config.params.requestId = Number(new Date());
  }

  if (Object.keys(config.data).length > 0) {
    config.data.requestId = Number(new Date());
  }

  return config;
});

export default http;
```

## AS 统计埋点

```js
import { AS } from 'auto-libs';

AS();
```

### 页面编号 事件号和携带参数

```js
AS({
  pageNo: 100,
  eventNo: 1000,
  eventContent: {
    name: 'hello world',
  },
});
```

## WX

```js
import { WX } from 'auto-libs';

// 微信分享
WX.share();
```

### 自定义参数

```js
WX.share({
  shareTitle: '凹凸租车', // 分享标题
  url: 'https://m.aotuzuche.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  sharePicUrl: 'https://carphoto.aotuzuche.com/web/auto/assets/imgs/logo.png', // 分享图标
  text: '凹凸租车 共享' // 分享详情
  type?: "userinfo" | "base" // 弹窗授权或者静默授权，默认静默
})
```

### 自定义按钮

```js
WX.share({
  shareTitle: '凹凸租车', // 分享标题
  url: 'https://m.aotuzuche.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  sharePicUrl: 'https://carphoto.aotuzuche.com/web/auto/assets/imgs/logo.png', // 分享图标
  text: '凹凸租车 共享', // 分享详情
  type?: "userinfo" | "base", // 弹窗授权或者静默授权，默认静默
  jsApiList?: jsApiListType[],  // menus
  callback?: (wx) => void  // ready 回调
})
```

## token 相关

### token

```js
import { getToken, setToken, clearToken, initToken } from 'auto-libs';

// 获取 token
getToken();

// 设置 token
setToken();

// 清空 token
clearToken();

// 初始化 token
initToken();

// 或者
await initToken();

// 忽略部分页面做initToken
initToken(() => {
  if (window.location.href === '需要忽略的url') {
    return true;
  }
  return false;
});
```

### 登录

```js
import { toLogin } from 'auto-libs'

toLogin(?params)
```

### openId

```js
import { getOpenId, setOpenId, clearOpenId } from 'auto-libs';

// 获取 openId
getOpenId();

// 设置 openId
setOpenId();

// 清空 openId
clearOpenId();
```

### unionId

```js
import { getUnionId, setUnionId, clearUnionId } from 'auto-libs';

// 获取 unionId
getUnionId();

// 设置 unionId
setUnionId();

// 清空 unionId
clearUnionId();
```

### virtualNo

```js
import { getVirtualNo, setVirtualNo, clearVirtualNo } from 'auto-libs';

// 获取虚拟会员号
getVirtualNo();

// 设置虚拟会员号
setVirtualNo();

// 清空虚拟会员号
clearVirtualNo();
```

### memNo

```js
import { getMemNo, setMemNo, clearMemNo } from 'auto-libs';

// 获取 memNo
getMemNo();

// 设置 memNo
setMemNo();

// 清空 memNo
clearMemNo();
```

## 时间转换

### offsetHours

### offsetDays

### stringToDate

```js
import { offsetHours, offsetDays, stringToDate } from 'auto-libs';

// 时间差，单位为小时
offsetHours();

// 将时间差转为文字方式
offsetDays();

// 将字符串20190101093000 转换为时间格式
stringToDate();
```
