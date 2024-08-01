import Reg from './reg';
import Search from './search';

export const launchApp = () => {
  let timer: any = null;

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

  if (['1006', '1007', '1008', '1009', '1019', '1020'].includes(type)) {
    param += `&orderNo=${Search.getDefault('orderNo', '')}`;
  }

  if (type === '1015' || type === '1022') {
    param += `&carNo=${Search.getDefault('carNo', '')}`;
  }

  if (type === '1018') {
    // 场景
    const sc = Search.getDefault('sceneCode', '');
    const sn = Search.getDefault('sceneName', '');
    param += `&sceneCode=${sc}&sceneName=${sn}`;
  }

  if (type === '1021') {
    const cn = Search.getDefault('carNo', '');
    const oc = Search.getDefault('isOpenCalendar', '');
    param += `&carNo=${cn}&isOpenCalendar=${oc}`;
  }

  if (Reg.isiOS) {
    try {
      window.location.href = `Atzuche://www.aotuzuche.com?${param}`;
      timer = setTimeout(() => {
        if (document.visibilityState === 'hidden') {
          timer && clearTimeout(timer);
          return;
        }
        window.location.href = 'https://itunes.apple.com/cn/app/id870422896'; // itunes
      }, 3000);
    } catch (_) {}
  } else {
    window.location.href = `intent://www.aotuzuche.com?${param}#Intent;package=com.Autoyol.auto;scheme=Atzuche;launchFlags=3;end;`;
    timer = setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        timer && clearTimeout(timer);
        return;
      }
      if (new Date().getTime() - clickedAt < 2000) {
        window.location.href = '//carphoto.aotuzuche.com/appdownload/atzuche_h5.apk';
      }
    }, 500);
  }
};

export const App = {
  navigate: () => {
    if (window.isMiniProgram) {
      alert('暂不支持在小程序内跳转, 请手动打开「凹凸租车」APP');
      return;
    }

    const type = Search.getDefault('type', '1000');
    let param = `type=${type}`;

    if (type === '1005') {
      const title = Search.getDefault('title', '');
      const url = Search.getDefault('url', '');
      param += `&url=${url}&title=${title}`;
    }

    if (['1006', '1007', '1008', '1009', '1019', '1020'].includes(type)) {
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

    if (type === '1021') {
      const cn = Search.getDefault('carNo', '');
      const oc = Search.getDefault('isOpenCalendar', '');
      param += `&carNo=${cn}&isOpenCalendar=${oc}`;
    }

    if (Reg.isiOS) {
      try {
        window.location.href = `Atzuche://www.aotuzuche.com?${param}`;
      } catch (_) {}
    } else {
      try {
        window.location.href = `intent://www.aotuzuche.com?${param}#Intent;package=com.Autoyol.auto;scheme=Atzuche;launchFlags=3;end;`;
      } catch (_) {}
    }
  },

  install: () => {
    if (Reg.isWX) {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.Autoyol.auto';
      return;
    }

    if (Reg.isiOS) {
      window.location.href = 'https://itunes.apple.com/cn/app/id870422896'; // itunes
    } else {
      window.location.href = 'https://carphoto.aotuzuche.com/appdownload/atzuche_h5.apk';
    }
  },
};
