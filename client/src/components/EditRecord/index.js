import React, { Component } from "react";
import "./style.css";
import Nav from "../Nav";
import EnsureLoggedInContainer from "../../containers/EnsureLoggedInContainer";

class Home extends Component {
  render() {
    const DistanceInMiles = 1.5;
    const TimeDurationInMinutes = 60;
    return (
      <div className="edit-record-page">
        <EnsureLoggedInContainer />
        <Nav />
        <main>
          <h3>Edit Record</h3>
        </main>
        <section>
          <label>
            Distance (in miles):
            <input type="text" value={DistanceInMiles} name="distance" />
          </label>
          <label>
            Time spent (in mins):
            <input type="text" value={TimeDurationInMinutes} name="time" />
          </label>
          <a href="#">Save</a>
        </section>
      </div>
    );
  }
}

export default Home;
