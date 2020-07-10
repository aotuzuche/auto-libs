import CDN from '../cdn';

describe('cdn file', () => {
  it('with empty', () => {
    expect(CDN.image()).toBe('https://cdn.atzuche.com/static/images/space.png');
  });

  it('no oss process', () => {
    expect(CDN.image('hehehe')).toBe('https://carphoto.atzuche.com/hehehe');
  });

  it('with oss process', () => {
    expect(CDN.image('hehehe', 100)).toBe(
      'https://carphoto.atzuche.com/hehehe?x-oss-process=image/resize,m_fill,w_100',
    );
  });

  it('with oss process', () => {
    expect(CDN.image('hehehe', 100, 100)).toBe(
      'https://carphoto.atzuche.com/hehehe?x-oss-process=image/resize,m_fill,w_100,h_100',
    );
  });

  it('with empty', () => {
    expect(CDN.asset()).toBe('https://cdn.atzuche.com/static/images/space.png');
  });

  it('no oss process', () => {
    expect(CDN.asset('hehehe')).toBe('https://cdn.atzuche.com/hehehe');
  });

  it('with oss process', () => {
    expect(CDN.asset('hehehe', 100)).toBe(
      'https://cdn.atzuche.com/hehehe?x-oss-process=image/resize,m_fill,w_100',
    );
  });

  it('with oss process', () => {
    expect(CDN.asset('hehehe', 100, 100)).toBe(
      'https://cdn.atzuche.com/hehehe?x-oss-process=image/resize,m_fill,w_100,h_100',
    );
  });
});
