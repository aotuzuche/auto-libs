# AUTO-libs

凹凸公用库

## http

http 请求

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

统计埋点

```js
import { AS } from 'auto-libs'

AS()
```

### 页面编号，事件号和携带参数

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
  callback?: (wx) => void	// ready 回调
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
