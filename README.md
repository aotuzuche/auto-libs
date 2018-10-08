# AUTO-lib

凹凸公用库

## http

http 请求

```js
import { http } from 'auto-lib'

http.request({
  method: 'get',
  url: `/wechatgw/jsapi/ticket`
})
```

### 自定义拦截器

```js
http.js

import { http } from 'auto-lib'

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
import { AS } from 'auto-lib'

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
import { WX } from 'auto-lib'

// 微信分享
WX.share()
```

### 自定义参数

```js
WX.share({
  title: '凹凸租车', // 分享标题
  url: 'https://m.aotuzuche.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  sharePicUrl: 'https://carphoto.aotuzuche.com/web/auto/assets/imgs/logo.png', // 分享图标
  text: '凹凸租车 共享' // 分享详情
})
```
