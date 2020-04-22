import qs from 'qs';

export default class Search {
  // 获取search的map
  public static parse() {
    const sh = window.location.search.replace(/^\?/, '');
    return qs.parse(sh);
  }

  // 获取search的string
  public static toString() {
    return window.location.search.replace(/^\?/, '');
  }

  // 获取search的指定key
  public static get(key: string): string {
    return Search.parse()[key];
  }

  // 获取search的指定key，不存在时使用默认值
  public static getDefault(key: string, value: string): string {
    const res = Search.parse()[key];
    return typeof res === 'undefined' ? value : res;
  }

  // 添加
  public static add(key: string, value: string) {
    const map = Search.parse();
    map[key] = value;
    window.history.replaceState(null, '', `?${qs.stringify(map)}`);
    return Search;
  }

  // 删除
  public static remove(...key: string[]) {
    const map = Search.parse();
    if (key && key.length) {
      for (let k of key) {
        delete map[k];
      }
    }
    window.history.replaceState(null, '', `?${qs.stringify(map)}`);
    return Search;
  }

  // 判断是否存在
  public static exist(key: string) {
    return typeof Search.get(key) !== 'undefined';
  }

  // 判断是否为
  public static is(key: string, value: string) {
    return Search.get(key) === value;
  }
}

// 旧版本
export const search = () => {
  const search = window.location.search.replace(/^\?/, '');
  return qs.parse(search);
};
