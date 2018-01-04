/**
 * Created by shenlin on 01/01/2018.
 */
import * as utiles from '../../actions/utiles';
import * as data from '../mock';

describe('Test utiles random color', () => {
  it('should return the initial state', () => {
    const result = utiles.getRandomColor();
    expect(result.length).toBe(7);
    expect(result[1]).toMatch(new RegExp('0|1|2|3|4|5|6|7|8|9'));
    expect(result[2]).toMatch(new RegExp('0|1|2|3|4|5|6|7|8|9'));
  });
});

describe('Test utiles messagesTransform', () => {
  it('should return transform messages in correct form', () => {
    const result = utiles.messagesTransform(data.chatRoomInfo);
    expect(result).toEqual(data.messages);
  });
});
