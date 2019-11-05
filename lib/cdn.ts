import isDev from './isDev';

export const cdn_host = !isDev
  ? 'https://cdn.atzuche.com/'
  : 'https://cdn-test.atzuche.com/';

