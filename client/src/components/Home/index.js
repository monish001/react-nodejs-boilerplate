import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Nav from '../Nav';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';

class Home extends Component {
  render() {
    let distanceThisWeek; //= 50;
    let elDistanceThisWeek;
    if (distanceThisWeek) {
      elDistanceThisWeek = (
        <div>
          Distance covered this week - {distanceThisWeek} miles.
        </div>
      );
    } else {
      elDistanceThisWeek = (
        <div>
          Distance covered this week - No records.
        </div>
      );
    }

    let speedThisWeek;
    let elSpeedThisWeek;
    if (speedThisWeek) {
      elSpeedThisWeek = (
        <div>
          Average Speed this week - {speedThisWeek} miles/min.
        </div>
      );
    } else {
      elSpeedThisWeek = (
        <div>
          Average Speed this week - No records.
        </div>
      );
    }
    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Nav />
        <main>
          <h3>Home</h3>
        </main>
        <section>
          {elDistanceThisWeek}
          {elSpeedThisWeek}
          <ul className="no-list-style-type">
            <li>
              <Link to="/records/view">View Records</Link>
            </li>
            <li>
              <Link to="/records/create">Create New</Link>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Home;
