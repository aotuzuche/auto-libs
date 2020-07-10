import Reg from './reg';
import Search from './search';

export const launchApp = () => {
  if (Reg.isWX) {
    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.Autoyol.auto';
    return;
  }
  const type = Search.getDefault('type', '1000');
  const clickedAt = Number(new Date());
  let param = `type=${type}`;

  if (type === '1005') {
    const title = Search.getDefault('title', '');
    const url = Search.getDefault('url', '');
    param += `&url=${url}&title=${title}`;
  }

  if (
    type === '1006' ||
    type === '1007' ||
    type === '1008' ||
    type === '1009' ||
    type === '1019' ||
    type === '1020'
  ) {
    param += `&orderNo=${Search.getDefault('orderNo', '')}`;
  }

  if (type === '1015') {
    param += `&carNo=${Search.getDefault('carNo', '')}`;
  }

  if (type === '1018') {
    // 场景
    const sc = Search.getDefault('sceneCode', '');
    const sn = Search.getDefault('sceneName', '');
    param += `&sceneCode=${sc}&sceneName=${sn}`;
  }

  if (Reg.isiOS) {
    window.location.href = `Atzuche://www.aotuzuche.com?${param}`;
    setTimeout(() => {
      if (new Date().getTime() - clickedAt < 2000) {
        window.location.href = 'https://itunes.apple.com/cn/app/id870422896'; // itunes
      }
    }, 500);
  } else {
    window.location.href = `intent://www.aotuzuche.com?${param}#Intent;package=com.Autoyol.auto;scheme=Atzuche;launchFlags=3;end;`;
    setTimeout(() => {
      if (new Date().getTime() - clickedAt < 2000) {
        window.location.href = '//carphoto.aotuzuche.com/appdownload/atzuche_h5.apk';
      }
    }, 500);
  }
};
