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
    expect(Desensitize.mobile('1991')).toBe('1991');
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

describe('hide bankcard', () => {
  it('with empty', () => {
    expect(Desensitize.bankCard('')).toBe('');
  });

  it('bankcard', () => {
    expect(Desensitize.bankCard('6228480023265389523')).toBe('62284800232********');
  });
});

describe('hide plateCode', () => {
  it('with empty', () => {
    expect(Desensitize.plateCode('')).toBe('');
  });

  it('plateCode', () => {
    expect(Desensitize.plateCode('沪AB00993')).toBe('沪A****93');
  });
});

describe('hide vin', () => {
  it('with empty', () => {
    expect(Desensitize.vin('')).toBe('');
  });

  it('vin', () => {
    expect(Desensitize.vin('6228480023265389523')).toBe('622*************523');
  });
});

describe('hide email', () => {
  it('with empty', () => {
    expect(Desensitize.email('')).toBe('');
  });

  it('email', () => {
    expect(Desensitize.email('liuxingy@163.com')).toBe('l*******@*******');
  });

  it('email@', () => {
    expect(Desensitize.email('liuxingy@')).toBe('l*******@');
  });

  it('@email', () => {
    expect(Desensitize.email('@154.ccdcd')).toBe('@*********');
  });
});
