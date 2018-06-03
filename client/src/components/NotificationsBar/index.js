import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style.css';

class NotificationsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e, createdAt) {
    this.props.dispatch({
      type: 'REMOVE_NOTIFICATION',
      createdAt,
    });
  }

  render() {
    const { notificationsList } = this.props;

    return (
      <div>
        {notificationsList.map((notification) => {
          const { createdAt, message } = notification;
          return (<div key={createdAt} onClick={e => this.onClick(e, createdAt)}>{message}</div>);
        })}
      </div>
    );
  }
}

// Specifies the default values for props:
NotificationsBar.defaultProps = {
  notificationsList: [],
  dispatch: null,
};

NotificationsBar.propTypes = {
  notificationsList: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    createdAt: PropTypes.string,
  })),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    notificationsList: state.notificationsList,
  };
}

export default connect(mapStateToProps)(NotificationsBar);
