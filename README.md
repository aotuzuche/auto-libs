# AUTO-libs 凹凸公用库

1. [公用样式和脚本引入](#公用样式和脚本引入)
   - [reset 样式](#reset-样式)
   - [flexible 布局脚本](#flexible-布局脚本)
   - [Input 扩展](#input-扩展)
2. [CDN](#CDN-方法)
3. [Report 错误上报](#Report-错误上报)
4. [Search 浏览器地址参数处理](#Search-浏览器地址参数处理)
5. [go 跳转](#go-跳转)
   - [取还车地址](#取还车地址)
   - [支付](#支付)
   - [身份认证](#身份认证)
   - [驾照认证](#驾照认证)
6. [http](#http)
   - [自定义拦截器](#自定义拦截器)
7. [AS 统计埋点](#as-统计埋点)
   - [页面编号 事件号和携带参数](#页面编号-事件号和携带参数)
8. [WX](#wx)
   - [自定义参数](#自定义参数)
   - [自定义按钮](#自定义按钮)
9. [token 相关](#token-相关)
   - [token](#token)
   - [登录](#登录)
   - [openId](#openid)
   - [unionId](#unionid)
   - [virtualNo](#virtualno)
   - [memNo](#memno)
10. [时间转换](#时间转换)
    - [offsetHours](#offsetHours)
    - [offsetDays](#offsetDays)
    - [stringToDate](#stringToDate)
11. [httpConsole](#httpConsole)
    - [自定义拦截器 管理后台](#自定义拦截器)

## 公用样式和脚本引入

### reset 样式

```js
import 'auto-libs/build/styles/reset';
```

### flexible 布局脚本

```js
import 'auto-libs/build/scripts/flexible';
```

### Input 扩展

```js
import 'auto-libs/build/scripts/inputEvents';
```

## CDN 方法

获取 cdn 的静态资源或图片资源，cdn 地址会自动根据开发和生产环境切换

另外当传递的值为空时，返回一张灰白色空图，保证了不会访问 cdn/undefined 这样的地址

```js
import { CDN } from 'auto-libs';

CDN.image('myimage.jpg'); // https://carphoto.atzuche.com/myimage.jpg

CDN.asset('myimage.jpg'); // https://cdn.atzuche.com/myimage.jpg

CDN.asset(void 0); // https://cdn.atzuche.com/static/images/space.png
```

## Report 错误上报

上报的错误将会到 sentry 仅适用于 react-scrupts-auto 脚手架项目

```js
import { Report } from 'auto-libs';

// 用于做一些记录
Report.info('info消息');

// 用于警告
Report.warning('warning消息');

// 用于记录错误
Report.error(new Error('错误'));
```

1. 使用`Report.error`时注意：传递的内容不管是不是一个 Error 类型的数据，用`new Error()`包一层，方便 sentry 做错误定位
1. 一般我们在`try { ... } catch (err) { ... }`的 catch 里上报错误，全局的错误在该脚手架中会自动上报

## Search 浏览器地址参数处理

```js
import { Search } from 'auto-libs'

// 获取当前网址search内容的map
Search.parse<T>()

// 获取当前网址search内容的string
Search.toString()

// map格式转string格式
const str = Search.map2string({ a: 1, b: 2 }) // a=1&b=2

// string格式转map格式
const map = Search.string2map('a=1&b=2') // { a: '1', b: '2' }

// 获取当前网址search的某个key
const t = Search.get('token')

// 获取当前网址search的某个key，当值为undefined时，取默认值
const t = Search.getDefault('token', '112233')

// 设置某个值到当前网址search中
Search.set('token', '112233')

// 当该key不存在时，设置某个值到当前网址search中
// 注意：当key存在值，不做任何处理
Search.define('token', '112233')

// 删除当前网址search中的某个key
Search.remove('token')

// 清空当前网址的search内容
Search.clear()

// 判断某个key是否存在于当前search
const hasToken = Search.exist('token')

// 比较当前search中某个值
const isNew = Search.is('new', '1')
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

## httpConsole

```js
import { httpConsole } from 'auto-libs';

httpConsole.request({
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
import {
  getToken,
  setToken,
  clearToken,
  initToken,
  getConsoleToken,
  setConsoleToken,
  clearConsoleToken,
} from 'auto-libs';

// 获取 token
getToken();

// 设置 token
setToken();

// 清空 token
clearToken();

// 获取console token
getConsoleToken();

// 设置console token
setConsoleToken();

// 清空console token
clearConsoleToken();

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

toLogin(params?)
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

## 正则

添加 Reg 对象，包含下面这些方法和属性：

是否是凹凸 app: isApp,

是否是微信: isWX,

是否是支付宝客户端: isAlipay,

是否是 iOS: isiOS,

是否是 android: isAndroid,

是否是百度客户端： isBaidu,

是否是企业微信：isWXWork,

是否是手机号 function： isMobile(str),

是否是电话号码 function： isTel(str),

是否是电子邮箱 function： isEmail(str),

是否是身份证 function：isIDCard(str),

是否是支付宝小程序 function isMiniAlipay() 异步函数,

是否是微信小程序 function isMiniWX() 异步函数,

是否是微信小程序 function isMiniBaidu() 异步函数,
