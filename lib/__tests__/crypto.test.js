import {Encrypt, Decrypt} from '../crypto'

describe('Encrypt AES', () => {
  it('with empty', () => {
    expect(Encrypt.AES('')).toBe('');
  });

  it('valid string data', () => {
    expect(Encrypt.AES('测试123', '1234567887654321')).toBe('A4CSTChkDsO4nb+JyIthyg==');
  });

  it('valid oject data', () => {
    const data = {name: '测试123'}
    expect(Encrypt.AES(data, '1234567887654321')).toBe('egm/Mle8irv5rcW8KiYIP1ctnN/sh3k/KwpYvwyhjVg=');
  });

  it('valid Array data', () => {
    const data = ['1', '2', '测试123']
    expect(Encrypt.AES(data, '1234567887654321')).toBe('GHRDr875WQZmG69cTBTvbaDBhT7IjN/lC8l5cfoHz2U=');
  });
});

describe('Decrypt AES', () => {
  it('with empty', () => {
    expect(Decrypt.AES('')).toBe('');
  });

  it('error data', () => {
    expect(Decrypt.AES('ABC123', '123456')).toBe('');
  });

  it('valid string data', () => {
    expect(Decrypt.AES('A4CSTChkDsO4nb+JyIthyg==', '1234567887654321')).toBe('测试123');
  });

  it('valid oject data', () => {
    const data = {name: '测试123'}
    expect(Decrypt.AES('egm/Mle8irv5rcW8KiYIP1ctnN/sh3k/KwpYvwyhjVg=', '1234567887654321')).toBe(JSON.stringify(data));
  });

  it('valid Array data', () => {
    const data = ['1', '2', '测试123']
    expect(Decrypt.AES('GHRDr875WQZmG69cTBTvbaDBhT7IjN/lC8l5cfoHz2U=', '1234567887654321')).toBe(JSON.stringify(data));
  });
});
