import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import * as StorageHelper from '../../adaptors/storage';

class EnsureLoggedInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const user = StorageHelper.getItem('user');
    const username = user && user.UserName;
    const isLoggedIn = !!username;
    if (isLoggedIn) {
      return this.props.children;
    }
    return <Redirect to="/login" />;
  }
}

EnsureLoggedInContainer.propTypes = {
  children: PropTypes.node,
};

EnsureLoggedInContainer.defaultProps = {
  children: null,
};

export default EnsureLoggedInContainer;
