/**
 * 数据脱敏
 */
const Desensitize = {
  /**
   * 身份证号脱敏
   * @param str 身份证号码
   * @returns 脱敏后的身份证码
   */
  idCard(str: string): string {
    return Desensitize.custom(str, 3, 4);
  },

  /**
   * 手机号脱敏
   * @param str 11位手机号
   * @returns 脱敏后的11位手机号
   */
  mobile(str: string): string {
    return Desensitize.custom(str, 3, 4);
  },

  /**
   * 姓名脱敏
   * @param str 姓名
   * @returns 脱敏后的姓名
   */
  name(str: string): string {
    return Desensitize.custom(str, 1, 0);
  },

  /**
   * 自定义脱敏
   * @param str 需要脱敏的字符串
   * @param showPrefix 显示前几位
   * @param showSuffix 显示后几位
   * @param hider 隐藏替换符，默认为 *
   * @returns 脱敏后的字符串
   */
  custom(str: string, showPrefix: number, showSuffix: number, hider = '*'): string {
    // 传参错误的情况，不处理
    if (!str || showPrefix < 0 || showSuffix < 0 || !hider) {
      return str;
    }

    // 需要显示的内容大于等于字符串长度，不处理
    if (showPrefix + showSuffix >= str.length) {
      return str;
    }

    // 进行隐藏替换
    const hiderCount = Math.max(str.length - showPrefix - showSuffix, 0);

    const allHider = Array(hiderCount)
      .fill(hider)
      .join('');

    return str.substr(0, showPrefix) + allHider + (showSuffix > 0 ? str.substr(-showSuffix) : '');
  },
};

export default Desensitize;
