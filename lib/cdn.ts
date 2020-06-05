import isDev from './isDev';

export const cdn = !isDev
  ? 'https://carphoto.atzuche.com/'
  : 'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/';

export const cdn_host = !isDev ? 'https://cdn.atzuche.com/' : 'https://cdn-test.atzuche.com/';

const withOssProcess = (url: string, width?: number, height?: number) => {
  if (typeof width !== 'number' && typeof height !== 'number') {
    return url;
  }

  let process = '';
  if (typeof width === 'number') {
    process += `x-oss-process=image/resize,m_fill,w_${width}`;
  }
  if (typeof height === 'number') {
    process =
      process === '' ? `x-oss-process=image/resize,m_fill,h_${height}` : `${process},h_${height}`;
  }
  if (url.indexOf('?') > 0) {
    return `${url}&${process}`;
  }
  return `${url}?${process}`;
};

const CDN = {
  /**
   * cdn前缀的图片
   * carphoto.atzuche.com
   */
  image(path: string, width?: number, height?: number) {
    if (!path) {
      return withOssProcess('https://cdn.atzuche.com/static/images/space.png', width, height);
    }

    if (path.indexOf('http') === 0) {
      return withOssProcess(path, width, height);
    }

    if (!isDev) {
      return withOssProcess(
        'https://carphoto.atzuche.com/' + path.replace(/^\/+/, ''),
        width,
        height,
      );
    }

    return withOssProcess(
      'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/' + path.replace(/^\/+/, ''),
      width,
      height,
    );
  },

  /**
   * cdn前缀的静态资源
   * cdn.atzuche.com
   */
  asset(path: string, width?: number, height?: number) {
    if (!path) {
      return withOssProcess('https://cdn.atzuche.com/static/images/space.png', width, height);
    }

    if (path.indexOf('http') === 0) {
      return withOssProcess(path, width, height);
    }

    if (!isDev) {
      return withOssProcess('https://cdn.atzuche.com/' + path.replace(/^\/+/, ''), width, height);
    }

    return withOssProcess(
      'https://cdn-test.atzuche.com/' + path.replace(/^\/+/, ''),
      width,
      height,
    );
  },
};

export default CDN;
