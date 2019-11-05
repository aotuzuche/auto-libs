import isDev from './isDev';

export const cdn = !isDev
  ? 'https://carphoto.atzuche.com/'
  : 'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/';

export const cdn_host = !isDev ? 'https://cdn.atzuche.com/' : 'https://cdn-test.atzuche.com/';
