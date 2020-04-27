import qs from 'qs';

const Search = {
  // 获取search的map
  parse<T extends any>(): T {
    const sh = window.location.search.replace(/^\?/, '');
    const map = qs.parse(sh);
    Object.keys(map).forEach(k => {
      map[k] = decodeURIComponent(decodeURIComponent(map[k]));
    });
    return map;
  },

  // 获取search的string
  toString() {
    return window.location.search.replace(/^\?/, '');
  },

  // 获取search的指定key
  get(key: string): string | undefined {
    const val = Search.parse()[key];
    return val;
  },

  // 获取search的指定key，不存在时使用默认值
  getDefault(key: string, value: string): string {
    const res = Search.get(key);
    return typeof res === 'undefined' ? value : res;
  },

  // 设置
  set(key: string, value: string) {
    const map = Search.parse();
    map[key] = value;
    window.history.replaceState(null, '', `?${qs.stringify(map)}`);
    return Search;
  },

  // 定义，即当不存在时才添加
  define(key: string, value: string) {
    if (!Search.exist(key)) {
      Search.set(key, value);
    }
    return Search;
  },

  // 删除
  remove(key: string) {
    const map = Search.parse();
    delete map[key];
    if (Object.keys(map).length === 0) {
      window.history.replaceState(null, '', window.location.origin + window.location.pathname);
    } else {
      window.history.replaceState(null, '', `?${qs.stringify(map)}`);
    }
    return Search;
  },

  // 清空
  clear() {
    window.history.replaceState(null, '', window.location.origin + window.location.pathname);
    return Search;
  },

  // 判断是否存在
  exist(key: string) {
    return typeof Search.get(key) !== 'undefined';
  },

  // 判断是否为
  is(key: string, value: string) {
    return Search.get(key) === value;
  },
};

export const search = () => {
  const search = window.location.search.replace(/^\?/, '');
  return qs.parse(search);
};

export default Search;
