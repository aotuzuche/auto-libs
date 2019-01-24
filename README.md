# AUTO-libs 凹凸公用库

1. [公用样式和脚本引入](#公用样式和脚本引入)
2. [cdn](#cdn)
3. [go](#go)
4. [http](#http)
   - [http 请求](#http-请求)
   - [自定义拦截器](#自定义拦截器)
5. [AS](#as)
   - [统计埋点](#统计埋点)
   - [页面编号 事件号和携带参数](#页面编号-事件号和携带参数)
6. [WX](#wx)
   - [自定义参数](#自定义参数)
   - [自定义按钮](#自定义按钮)
7. [token 相关](#token-相关)

## 公用样式和脚本引入

```js
// reset 样式
import 'auto-libs/build/styles/reset'

// flexible 布局脚本
import 'auto-libs/build/scripts/flexible'

// Date 扩展
import 'auto-libs/build/scripts/date'

// Input 扩展
import 'auto-libs/build/scripts/inputEvents'
```

## cdn

cdn 地址

```js
import { cdn } from 'auto-libs'
```

## go

跳转地址

```js
import { go } from 'auto-libs'

const { address, pay } = go

// 取还车地址
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

// 支付
pay({
  token: string
  orderNo: string
  payKind: string
  redirect_url: string
})
```

## http

### http 请求

```js
import { http } from 'auto-libs'

http.request({
  method: 'get',
  url: `/wechatgw/jsapi/ticket`
})
```

### 自定义拦截器

```js
http.js

import { http } from 'auto-libs'

http.interceptors.request.use(config => {
  if (config.method === 'get') {
    if (typeof config.params !== 'object') {
      config.params = {}
    }

    config.params.requestId = Number(new Date())
  }

  if (Object.keys(config.data).length > 0) {
    config.data.requestId = Number(new Date())
  }

  return config
})

export default http
```

## AS

### 统计埋点

```js
import { AS } from 'auto-libs'

AS()
```

### 页面编号 事件号和携带参数

```js
AS({
  pageNo: 100,
  eventNo: 1000,
  eventContent: {
    name: 'hello world'
  }
})
```

## WX

微信相关

```js
import { WX } from 'auto-libs'

// 微信分享
WX.share()
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

```js
import {
  getToken,
  setToken,
  clearToken,
  initToken,
  toLogin,
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
  clearMemNo
  } from 'auto-libs'

// 获取 token
getToken()

// 设置 token
setToken()

// 清空 token
clearToken()

// 初始化 token
initToken()

// 或者
await initToken()

// 登录，params 可选，为携带到 URL 上的参数
toLogin(?params)

// 获取 openId
getOpenId()

// 设置 openId
setOpenId()

// 清空 openId
clearOpenId()

// 获取 unionId
getUnionId()

// 设置 unionId
setUnionId()

// 清空 unionId
clearUnionId()

// 获取虚拟会员号
getVirtualNo()

// 设置虚拟会员号
setVirtualNo()

// 清空虚拟会员号
clearVirtualNo()

// 获取 memNo
getMemNo()

// 设置 memNo
setMemNo()

// 清空 memNo
clearMemNo()

```
