/**
 * Created by shenlin on 06/01/2018.
 */
const { expect } = require('chai');

describe('webdriver.io chat room page', () => {
  it('should be able to send message', () => {
    browser.url('/chat-room');

    // add new user
    $('.new-user input').setValue('test user 1');
    browser.keys('Enter');

    // go to chat room
    browser.waitForVisible('.chat');

    // send a message
    $('#message-to-send').setValue('I love java scrpt 3');
    browser.keys('Enter');

    browser.timeouts('implicit', 3000);
    const messages = $$('li');
    expect(messages[messages.length - 1].$('.message-data-name').getText()).to.equal('test user');
  });

  it('should receive message', () => {
    // webdriver io cannot new a section automatically
    browser.sessionStorage('DELETE', 'id');
    browser.sessionStorage('DELETE', 'name');
    browser.sessionStorage('DELETE', 'color');

    // user 2
    browser.newWindow('/chat-room');
    $('.new-user input').setValue('test user 2');
    browser.keys('Enter');
    browser.waitForVisible('.chat');
    const message = $$('li');

    // verify message
    expect(message[message.length - 1].$('.message-data-name').getText()).to.equal('test user');
  });
});
