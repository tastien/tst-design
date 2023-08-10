import { rgbToHex } from '../utils';

describe('>>> rgbToHex', () => {
  it('when rgb(255,180,0)', () => {
    expect(rgbToHex('rgb(255,180,0)')).toBe('#FFB400');
  });

  it('when rgb(255,192,203)', () => {
    expect(rgbToHex('rgb(255,192,203)')).toBe('#FFC0CB');
  });
});
