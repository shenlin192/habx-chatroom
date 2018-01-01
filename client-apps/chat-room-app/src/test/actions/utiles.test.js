/**
 * Created by shenlin on 01/01/2018.
 */
import * as utiles from '../../actions/utiles';

describe('Test utiles random color', () => {
  it('should return the initial state', () => {
    const result = utiles.getRandomColor();
    expect(result.length).toBe(7);
    expect(result[1]).toMatch(new RegExp('0|1|2|3|4|5|6|7|8|9'));
    expect(result[2]).toMatch(new RegExp('0|1|2|3|4|5|6|7|8|9'));
  });
});
