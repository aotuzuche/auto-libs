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
   * 车架号
   * @param str 车架号
   * @returns 脱敏后的车架号
   */
  vin(str: string): string {
    return Desensitize.custom(str, 3, 3);
  },

  /**
   * 车牌号
   * @param str 车牌
   * @returns 脱敏后的车牌
   */
  plateCode(str: string): string {
    return Desensitize.custom(str, 2, 2);
  },

  /**
   * 银行卡
   * @param str 银行卡
   * @returns 脱敏后的银行卡
   */
  bankCard(str: string): string {
    return Desensitize.custom(str, str.length - 8, 0);
  },

  /**
   * 邮箱
   * @param str 邮箱
   * @returns 脱敏后的邮箱
   */
  email(str: string): string {
    if (str.indexOf('@') > -1) {
      const [str1, str2] = str.split('@');
      return Desensitize.custom(str1, 1, 0) + '@' + Desensitize.custom(str2, 0, 0);
    }

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
    const sstr = String(str);

    // 传参错误的情况，不处理
    if (!sstr || showPrefix < 0 || showSuffix < 0 || !hider) {
      return sstr;
    }

    // 需要显示的内容大于等于字符串长度，不处理
    if (showPrefix + showSuffix >= sstr.length) {
      return sstr;
    }

    // 进行隐藏替换
    const hiderCount = Math.max(sstr.length - showPrefix - showSuffix, 0);

    const allHider = Array(hiderCount)
      .fill(hider)
      .join('');

    return sstr.substr(0, showPrefix) + allHider + (showSuffix > 0 ? sstr.substr(-showSuffix) : '');
  },
};

export default Desensitize;
