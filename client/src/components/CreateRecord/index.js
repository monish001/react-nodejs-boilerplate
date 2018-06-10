import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './style.css';
import Header from '../Header';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as Repository from '../../repositories/user-record';
import * as StorageHelper from '../../adaptors/storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToHome: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { distance, time, userId } = this.refs;
    Repository.create({
      distance: distance.value,
      time: time.value,
      userId: (userId && userId.value) || StorageHelper.getUserId(),
    })
      .then(() => {
        this.setState({ goToHome: true });
      })
      .catch((err) => {
        console.error(err); // TODO
      });
  }

  render() {
    const { goToHome } = this.state;
    if (goToHome) {
      return <Redirect to="/" />;
    }
    const userRole = StorageHelper.getUserRole();
    const isRegularUserRole = (userRole === 'REGULAR_USER');
    return (
      <div className="create-record-page">
        <EnsureLoggedInContainer />
        <Header />
        <main>
          <h3>Create Record</h3>
        </main>
        <section>
          {!isRegularUserRole &&
            <label htmlFor="user-id">
              User id:
              <input type="text" name="user-id" ref="userId" />
            </label>}
          <label htmlFor="distance">
            Distance (in miles):
            <input type="text" name="distance" ref="distance" />
          </label>
          <label htmlFor="time">
            Time spent (in mins):
            <input type="text" name="time" ref="time" />
          </label>
          <a href="# " onClick={this.onClick}>Create New</a>
        </section>
      </div>
    );
  }
}

export default Home;
