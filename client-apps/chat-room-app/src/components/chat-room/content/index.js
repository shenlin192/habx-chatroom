/**
 * Created by shenlin on 27/12/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { setTempMessage, receiveMessage, addMessage, setTempUserName, setUserName, updateMessage } from '../../../actions/chatRoomActions';
import { dateTransform } from './utiles';
import './styles.css';
import modify from './media/modify.png';
import save from './media/save.png';

class Content extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      userId: PropTypes.string,
      color: PropTypes.string,
      content: PropTypes.string,
      date: PropTypes.string,
    })),
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    tempMessage: PropTypes.string.isRequired,
    tempUserName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    messages: [],
  };

  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', (message) => {
      this.scrollToBottom();
      this.props.dispatch(receiveMessage(message));
    });
    this.socket.on('changeUserName', (updatedUser) => {
      this.props.dispatch(updateMessage(updatedUser));
    });
  }
  
  
  // modify user name
  changeEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  userNameChange = (event) => {
    this.props.dispatch(setTempUserName(event.target.value));
  };

  saveUserName = () => {
    this.changeEditMode();
    const newName = this.props.tempUserName.trim();
    if (newName) {
      this.props.dispatch(setUserName(newName));
      this.socket.emit('changeUserName', {
        id: this.props.user.id,
        name: newName,
      });
    }
  };
  

  // send messages
  messageKeyUp = (event) => {
    if (event.keyCode === 13) {
      if (!event.nativeEvent.shiftKey) {
        this.sendMessage();
      }
    }
  };

  messageChange = (event) => {
    this.props.dispatch(setTempMessage(event.target.value));
  };

  sendMessage = () => {
    const value = this.props.tempMessage.trim();
    if (value) {
      this.props.dispatch(setTempMessage(''));
      this.props.dispatch(addMessage(this.props.user, value));
      this.scrollToBottom();
      this.socket.emit('message', {
        user: this.props.user,
        value,
      });
    }
  };
  
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  
  
  // message history list
  messageList = () => {
    if (this.props.messages.length) {
      return this.props.messages.map(message => (
        <li
          className={message.userId === this.props.user.id ? 'self' : 'other'}
          key={message.userId + message.date}
        >
          <div className="message-data">
            <span className="message-data-time" >{ dateTransform(message.date) }</span> &nbsp; &nbsp;
            <span className="message-data-name">{ message.name }</span>
          </div>

          <div className="message" style={{ background: message.color }}>
            <div className="triangle" style={{ borderBottomColor: message.color }} />
            { message.content }
          </div>
        </li>
      ));
    }
  };


  render() {
    return (
      <div className="chat">
        <section className="chat-header">
          {
            this.state.editMode ?
              <img src={save} alt="save" onClick={this.saveUserName} /> :
              <img src={modify} alt="modify" onClick={this.changeEditMode} />

          }
          <div className="chat-about">
            {
              this.state.editMode ?
                <input
                  className="usernameInput"
                  type="text"
                  maxLength="30"
                  value={this.props.tempUserName}
                  onChange={this.userNameChange}
                /> :
                <div className="chat-with">{ this.props.user.name }</div>
            }
            <div className="chat-num-messages">already {this.props.messages.length} messages</div>
          </div>
        </section>
        <section className="chat-history">
          <ul>
            {this.messageList()}
            <div
              ref={(el) => { this.messagesEnd = el; }}
            />
          </ul>
        </section>
        <section className="chat-message">
          <textarea
            name="message-to-send"
            id="message-to-send"
            placeholder="Type your message"
            rows="2"
            value={this.props.tempMessage}
            onChange={this.messageChange}
            onKeyUp={this.messageKeyUp}
          />
          <button onClick={this.sendMessage}>Send</button>
        </section>
      </div>
    );
  }
}

export default connect(store => ({
  messages: store.room.messages,
  user: store.room.user,
  tempMessage: store.room.tempMessage,
  tempUserName: store.room.tempUserName,
}))(Content);
