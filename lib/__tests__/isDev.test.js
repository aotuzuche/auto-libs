import isDev from '../isDev';

describe('isDev file', () => {
  it('isDev default false', () => {
    expect(isDev).toBeFalsy();
  });
});
