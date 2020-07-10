import * as React from 'react';
// 常用的react-hooks

const Ruse = {
  /**
   * 倒计时
   * todo: 未完成
   */
  countdown(t: number) {
    const [val, setVal] = React.useState<number>(t);

    let timer: any;
    const run = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setVal(val - 1);
        run();
      }, 1000);
    };

    const reset = () => {
      setVal(t);
      run();
    };

    return [val];
  },
};

export default Ruse;
