import isDev from '../isDev';

describe('isDev', () => {
  it('isDev default false', () => {
    expect(isDev).toBeFalsy();
  });
});
