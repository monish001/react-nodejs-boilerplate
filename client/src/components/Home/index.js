import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Nav from '../Nav';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as UserRecordsRepository from '../../repositories/user-record';
import * as Utilities from '../../utilities';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceThisWeek: null,
      timeSpentThisWeek: null,
    };
    this.getElDistanceThisWeek = this.getElDistanceThisWeek.bind(this);
    this.getElSpeedThisWeek = this.getElSpeedThisWeek.bind(this);
  }

  componentWillMount() {
    const { weekStart, weekEnd } = Utilities.getWeekStartEndDates();

    // TODO loader
    UserRecordsRepository
      .read(null, weekStart, weekEnd)
      .then((response) => {
        const responseData = (response && response.data) || [];
        console.log(responseData);
        let totalDistance = 0;
        let totalTime = 0;
        responseData.forEach((record) => {
          totalDistance += record.DistanceInMiles;
          totalTime += record.TimeDurationInMinutes;
        });

        this.setState({
          distanceThisWeek: totalDistance,
          timeSpentThisWeek: totalTime,
        });
      }).catch(err => console.error(err));
  }

  getElDistanceThisWeek() {
    const { distanceThisWeek } = this.state;
    let distanceThisWeekTitle;
    if (!distanceThisWeek) {
      distanceThisWeekTitle = 'No records.';
    } else if (distanceThisWeek === 1) {
      distanceThisWeekTitle = `${distanceThisWeek} mile.`;
    } else {
      distanceThisWeekTitle = `${distanceThisWeek} miles.`;
    }
    const elDistanceThisWeek = (
      <div>
        Distance covered this week - {distanceThisWeekTitle}
      </div>
    );
    return elDistanceThisWeek;
  }

  getElSpeedThisWeek() {
    const { timeSpentThisWeek, distanceThisWeek } = this.state;
    const speedThisWeek = distanceThisWeek && (distanceThisWeek / timeSpentThisWeek);
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
    return elSpeedThisWeek;
  }

  render() {
    const elDistanceThisWeek = this.getElDistanceThisWeek();
    const elSpeedThisWeek = this.getElSpeedThisWeek();

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
