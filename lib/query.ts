import qs from 'qs';

export default class Query {
  // 获取query的map
  public static get() {
    const sh = window.location.search.replace(/^\?/, '');
    return qs.parse(sh);
  }

  // 获取query的指定key
  public static getKey(key: string) {
    return Query.get()[key];
  }

  // 获取query的指定key，不存在时使用默认值
  public static getKeyDefault(key: string, value: string) {
    const res = Query.get()[key];
    return typeof res === 'undefined' ? value : res;
  }

  // 添加
  public static add(key: string, value: string) {
    const map = Query.get();
    map[key] = value;
    window.history.replaceState(null, '', `?${qs.stringify(map)}`);
  }

  // 删除
  public static remove(key: string) {
    const map = Query.get();
    delete map[key];
    window.history.replaceState(null, '', `?${qs.stringify(map)}`);
  }

  // 判断是否存在
  public static exist(key: string) {
    return typeof Query.getKey(key) !== 'undefined';
  }

  // 判断是否为
  public static is(key: string, value: string) {
    return Query.getKey(key) === value;
  }
}
