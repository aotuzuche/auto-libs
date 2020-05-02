import isDev from './isDev';

export const cdn = !isDev
  ? 'https://carphoto.atzuche.com/'
  : 'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/';

export const cdn_host = !isDev ? 'https://cdn.atzuche.com/' : 'https://cdn-test.atzuche.com/';

const CDN = {
  /**
   * cdn前缀的图片
   */
  image(path: string) {
    if (!path) {
      return 'https://cdn.atzuche.com/static/images/space.png';
    }

    if (!isDev) {
      return 'https://carphoto.atzuche.com/' + path;
    }

    return 'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/' + path;
  },

  /**
   * cdn前缀的静态资源
   */
  asset(path: string) {
    if (!path) {
      return 'https://cdn.atzuche.com/static/images/space.png';
    }

    if (!isDev) {
      return 'https://cdn.atzuche.com/' + path;
    }

    return 'https://cdn-test.atzuche.com/' + path;
  },
};

export default CDN;
