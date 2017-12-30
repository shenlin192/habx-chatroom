/**
 * Created by shenlin on 25/12/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showChatRoom, addNewUser } from '../../actions/newUserActions';
import './styles.css';

class NewUser extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.props.dispatch(showChatRoom(true));
      this.props.dispatch(addNewUser(e.target.value));
    }
  };

  render() {
    return (
      <div className="new-user">
        <h1> What&apos;s your nickname? </h1>
        <input
          className="usernameInput"
          type="text"
          maxLength="30"
          onKeyPress={(e) => {
                 this.handleKeyPress(e);
               }}
        />
      </div>
    );
  }
}

export default connect(store => ({

}))(NewUser);
