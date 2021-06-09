import Desensitize from '../desensitize';

describe('hide idcard', () => {
  it('with empty', () => {
    expect(Desensitize.idCard('')).toBe('');
  });

  it('error idcard', () => {
    expect(Desensitize.idCard('123456')).toBe('123456');
  });

  it('idcard', () => {
    expect(Desensitize.idCard('310110199912120101')).toBe('310***********0101');
  });
});

describe('hide mobile', () => {
  it('with empty', () => {
    expect(Desensitize.mobile('')).toBe('');
  });

  it('error mobile', () => {
    expect(Desensitize.mobile('110')).toBe('110');
  });

  it('mobile', () => {
    expect(Desensitize.mobile('13800138000')).toBe('138****8000');
  });
});

describe('hide name', () => {
  it('with empty', () => {
    expect(Desensitize.name('')).toBe('');
  });

  it('name', () => {
    expect(Desensitize.name('张三丰')).toBe('张**');
  });
});

describe('hide custom', () => {
  it('custom hider', () => {
    expect(Desensitize.custom('abcde', 1, 1, '@')).toBe('a@@@e');
  });
});
