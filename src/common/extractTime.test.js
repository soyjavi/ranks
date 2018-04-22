import extractTime from './extractTime';

describe('extractTime()', () => {
  it('default', () => {
    let value = extractTime();
    expect(value).toEqual(null);
  });

  it('using shortcut for minutes', () => {
    let value = extractTime('hello world in 2m');
    expect(value).toHaveProperty('match', '2m');
    expect(value).toHaveProperty('value', 120);
  });

  it('using shortcut for hours', () => {
    let value = extractTime('in 3h we will...');
    expect(value).toHaveProperty('match', '3h');
    expect(value).toHaveProperty('value', 10800);
  });

  it('no detect any available shortcut', () => {
    let value = extractTime('in 3 hours we will...');
    expect(value).toEqual(null);
  });
});
