export const cdn =
  process.env.PACKAGE === 'production'
    ? '//carphoto.atzuche.com/'
    : '//at-images-test.oss-cn-hangzhou.aliyuncs.com/'
