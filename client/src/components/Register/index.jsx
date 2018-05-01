import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import * as Repository from '../../repos';
import * as StorageHelper from '../../adaptors/storage';
import { Redirect } from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToHome: false,
      showError: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleRegister() {
    const password = this.refs.password.value;
    if (password !== this.refs['c-password'].value) {
      this.setState({ showError: true });
      return;
    }
    Repository.register({
      username: this.refs.username.value,
      password,
    })
      .then((response) => {
        // TODO encrypted passwd can be removed from get user api response
        // StorageHelper.setItem('user', response.data);
        this.setState({ goToHome: true });
      })
      .catch((err) => {
        // TODO
        console.error(err);
      });
  }
  render() {
    const { goToHome, showError } = this.state;
    if (goToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register-page">
        <main>
          <h3>Register</h3>
        </main>
        <section>
          {showError && <div>Error - Password mismatch!!</div>}
          <label htmlFor="username">
            Username: {' '}
            <input id="username" type="text" name="username" ref="username" />
          </label>
          <label htmlFor="password">
            Password: {' '}
            <input
              id="password"
              type="password"
              name="password"
              ref="password"
              onChange={() => this.setState({ showError: false })}
            />
          </label>
          <label htmlFor="c-password">
            Confirm password: {' '}
            <input
              id="c-password"
              type="password"
              name="c-password"
              ref="c-password"
              onChange={() => this.setState({ showError: false })}
            />
          </label>
          <a href="#" onClick={this.handleRegister}>Register</a>
          {' '}
          or
          {' '}
          <Link to="/login">Login</Link>
        </section>
      </div>
    );
  }
}

export default Register;
