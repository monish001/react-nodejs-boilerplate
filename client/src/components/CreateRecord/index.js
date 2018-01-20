import React, { Component } from "react";
import "./style.css";
import Nav from '../Nav';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';

class Home extends Component {
  render() {
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
            <input type="text" name="distance" />
          </label>
          <label>
            Time spent (in mins):
            <input type="text" name="time" />
          </label>
          <a href="#" onClick>Create New</a>
        </section>
      </div>
    );
  }
}

export default Home;
