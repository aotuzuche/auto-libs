import { getMiniProgramEnv } from '../miniprogram';

describe('miniprogram file', () => {
  it('getMiniProgramEnv default', async () => {
    const result = await getMiniProgramEnv();
    expect(result).toMatchObject({
      isMiniProgram: false,
    });
  });

  it('getMiniProgramEnv - isAlipay', async () => {
    const getEnvMock = jest.fn(cb => cb({ miniprogram: true }));
    window.my = {};
    window.my.getEnv = getEnvMock;
    const result = await getMiniProgramEnv();
    expect(result).toMatchObject({
      isMiniProgram: true,
      isAlipay: true,
    });
    delete window.my;
  });

  it('getMiniProgramEnv - isWeapp', async () => {
    const getEnvMock = jest.fn(cb => cb({ miniprogram: true }));
    window.wx = { miniProgram: { getEnv: getEnvMock } };
    const result = await getMiniProgramEnv();
    expect(result).toMatchObject({
      isMiniProgram: true,
      isWeapp: true,
    });
    delete window.wx;
  });

  it('getMiniProgramEnv - isSwan', async () => {
    const getEnvMock = jest.fn(cb => cb({ smartprogram: true }));
    window.swan = { webView: { getEnv: getEnvMock } };
    const result = await getMiniProgramEnv();
    expect(result).toMatchObject({
      isMiniProgram: true,
      isSwan: true,
    });
    delete window.swan;
  });
});
