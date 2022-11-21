import { extractGeoParameters } from '../src';

// TODO extract params by using data from existing projects
describe('Service', () => {
  it('should return the konami cheatcode', () => {
    const result = undefined; // extractGeoParameters();
    const expectedResult = 'Up, Up, Down, Down, Left, Right, Left, Right, B, A';

    expect(result).toEqual(expectedResult);
  });
});
