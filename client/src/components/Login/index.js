import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import * as Repo from "../../repos";
import * as StorageHelper from "../../adaptors/storage";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToHome: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    Repo.login({
      username: this.refs.username.value,
      password: this.refs.password.value
    })
      .then(response => {
        // TODO encrypted passwd can be removed from get user api response
        StorageHelper.setItem("user", response.data);
        this.setState({ goToHome: true });
      })
      .catch(err => {
        // TODO
        console.error(err);
      });
  }
  render() {
    const { goToHome } = this.state;
    if (goToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page">
        <main>
          <h3>Login</h3>
        </main>
        <section>
          <label>
            Username: {" "}
            <input type="text" name="username" ref="username" />
          </label>
          <label>
            Password: {" "}
            <input type="password" name="password" ref="password" />
          </label>
          <a href="#" onClick={this.handleLogin}>Login</a>
          {" "}
          or
          {" "}
          <Link to="/register">Register</Link>
        </section>
      </div>
    );
  }
}

export default Login;
