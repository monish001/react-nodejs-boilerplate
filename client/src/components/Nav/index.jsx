import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './style.css';
import * as StorageHelper from '../../adaptors/storage';
import * as Repo from '../../repos';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    StorageHelper.removeItem('user');
    Repo.logout().then(() => this.setState({ goToLogin: true }));
  }

  render() {
    const { goToLogin } = this.state;

    if (goToLogin) {
      return <Redirect to="/login" />;
    }

    const user = StorageHelper.getItem('user');
    const username = user && user.UserName;
    const isLoggedIn = !!username;

    if (isLoggedIn) {
      return (
        <div className="nav">
          Hi {username}
          <a href="#" onClick={this.logout}>Logout</a>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Nav;
