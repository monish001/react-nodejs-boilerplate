import React from 'react';
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
      return this.props.children || null;
    }
    return <Redirect to="/login" />;
  }
}

export default EnsureLoggedInContainer;
