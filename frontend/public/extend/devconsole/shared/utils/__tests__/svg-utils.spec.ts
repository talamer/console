/* eslint-disable no-unused-vars, no-undef */
import { createSvgIdUrl } from '../svg-utils';

const mockLocation = (location?: {
hash?: string;
port?: number;
pathname?: string;
search?: string;
origin?: string;
}) =>
  ((window: any) => {
    const windowLocation = JSON.stringify(window.location);
    delete window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: JSON.parse(windowLocation),
    });
    if (location) {
      Object.assign(window.location, location);
    }
  })(window);

describe('svg-utils#createSvgIdUrl', () => {
  it('should return absolute url based on pathname and search', () => {
    mockLocation({
      pathname: '/foo/bar',
      search: '?key=value',
    });
    expect(createSvgIdUrl('testid')).toBe('url(/foo/bar?key=value#testid)');
  });
});
