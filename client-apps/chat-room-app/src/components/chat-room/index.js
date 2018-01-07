/**
 * Created by shenlin on 25/12/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './loading';
import Content from './content';

class ChatRoom extends Component {
  static propTypes = {
    fetched: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { preLoading: true };
  }

  componentDidMount() {
    // at least 2 seconds of loading animation
    setTimeout(() => {
      this.setState({ preLoading: false });
    }, 2000);
  }

  render() {
    return (
      <div className="chat-room" style={{ minHeight: '100vh' }}>
        {
          (() => {
            if (this.state.preLoading || !this.props.fetched) {
              return <Loading />;
            }
            return <Content />;
          })()
        }
      </div>
    );
  }
}

export default connect(store => ({
  fetched: store.room.fetched,
}))(ChatRoom);
