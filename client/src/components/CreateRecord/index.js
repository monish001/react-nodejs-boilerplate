import React, { Component } from 'react';
import './style.css';
import Nav from '../Nav';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as Repository from '../../repositories/user-record';
import * as StorageHelper from '../../adaptors/storage';
import { Redirect } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToHome: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    Repository.create({
      distance: this.refs.distance.value,
      time: this.refs.time.value
    })
      .then(response => {
        // debugger;
        // TODO encrypted passwd can be removed from get user api response
        // StorageHelper.setItem("user", response.data);
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
      <div className="create-record-page">
        <EnsureLoggedInContainer/>
        <Nav />
        <main>
          <h3>Create Record</h3>
        </main>
        <section>
          <label>
            Distance (in miles):
            <input type="text" name="distance" ref="distance" />
          </label>
          <label>
            Time spent (in mins):
            <input type="text" name="time" ref="time" />
          </label>
          <a href="#" onClick={this.onClick}>Create New</a>
        </section>
      </div>
    );
  }
}

export default Home;
