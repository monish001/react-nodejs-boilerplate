import React, { Component } from 'react';
import Nav from '../Nav';
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
      </div>
    );
  }
}

export default Header;
