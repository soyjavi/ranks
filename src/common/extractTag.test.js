import extractTag from './extractTag';

describe('extractTag()', () => {
  it('default', () => {
    let value = extractTag();
    expect(value).toEqual(null);
  });

  it('detects a hashtag', () => {
    let value = extractTag('#hello world');
    expect(value).toEqual('#hello ');
  });

  it('no detects a hashtag', () => {
    let value = extractTag('hello world');
    expect(value).toEqual(null);
  });
});
