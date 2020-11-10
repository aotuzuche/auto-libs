import qs from 'qs';
import Cookie from 'js-cookie';

export interface ASData {
  pageNo?: number;
  eventNo?: number;
  eventContent?: object;
}

export async function AS(data: ASData = {}) {
  if (!data.eventContent) {
    data.eventContent = {};
  }

  if (typeof data.eventContent === 'object') {
    (data.eventContent as any).platformType = (window as any).platform;
  }

  if (window.sessionStorage.getItem('__atMiniProgram__') === 'True') {
    let et = window.sessionStorage.getItem('__atMiniProgramET__');
    if (et) {
      et = decodeURIComponent(et);
      et.split(',').forEach(i => {
        const v = i.split('=');
        if (v && v.length === 2 && data.eventContent) {
          data.eventContent[v[0]] = v[1];
        }
      });
    }
  }

  if (typeof data.eventContent === 'object') {
    let params: string[] = [];
    (Object as any).entries(data.eventContent).forEach(([key, value]: [string, any]) => {
      params.push(`${key}=${value}`);
    });

    const utmSource = Cookie.get('utm_source');
    const utmMedium = Cookie.get('utm_medium');
    const utmCampaign = Cookie.get('utm_campaign');
    const utmTerm = Cookie.get('utm_term');
    if (utmSource) {
      params.push(`utm_source=${utmSource}`);
    }
    if (utmMedium) {
      params.push(`utm_medium=${utmMedium}`);
    }
    if (utmCampaign) {
      params.push(`utm_campaign=${utmCampaign}`);
    }
    if (utmTerm) {
      params.push(`utm_term=${utmTerm}`);
    }

    data.eventContent = `{${params.join(',')}}` as any;
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
