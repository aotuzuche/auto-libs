import qs from 'qs';

export interface ASData {
  pageNo?: number;
  eventNo?: number;
  eventContent?: object | string;
}

export async function AS(data: ASData = {}) {
  if (typeof data.eventContent === 'object') {
    let params: string[] = [];
    (Object as any).entries(data.eventContent).forEach(([key, value]: [string, any]) => {
      params.push(`${key}=${value}`);
    });
    data.eventContent = `{${params.join(',')}}`;
  }

  // 防止 GC 掉用变量存储
  const random = 'img_' + Math.random();
  const img = new Image();
  window[random] = img;
  img.onload = img.onerror = () => {
    window[random] = null;
  };

  const currentOrigin = window.location.origin;
  // 可以利用 qs 来格式化参数
  img.src = currentOrigin + '/log.gif?' + qs.stringify(data);
}
