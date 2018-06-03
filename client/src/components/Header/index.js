import React, { Component } from 'react';
import Nav from '../Nav';
import NotificationsBar from '../NotificationsBar';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <NotificationsBar />
      </div>
    );
  }
}

export default Header;
