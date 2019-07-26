export function setTitle(title: string) {
  document.title = title;
  let mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
}
