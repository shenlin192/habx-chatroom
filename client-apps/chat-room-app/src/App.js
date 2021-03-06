import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchChat } from './actions/appActions';
import NewUser from './components/new-user';
import ChatRoom from './components/chat-room';
import './App.css';


class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    showChatRoom: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    // fetch chat room data from server
    this.props.dispatch(fetchChat());
  }

  render() {
    return (
      <main>
        {(() => {
          if (!this.props.showChatRoom) {
            return <NewUser />;
          }
          return <ChatRoom />;
        })()}
      </main>
    );
  }
}

export default connect(store => ({
  showChatRoom: store.room.showChatRoom,
}))(App);
