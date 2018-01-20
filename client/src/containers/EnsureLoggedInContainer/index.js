import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as StorageHelper from "../../adaptors/storage";
import * as Repo from "../../repos";
import { Redirect } from "react-router";

class EnsureLoggedInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false
    };
  }

  render() {
    const user = StorageHelper.getItem("user");
    const username = user && user.UserName;
    const isLoggedIn = !!username;
    if (isLoggedIn) {
      return this.props.children || null;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default EnsureLoggedInContainer;
