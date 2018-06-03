import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../Header';
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
        // console.log(responseData);
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
    const speedThisWeek = timeSpentThisWeek && (distanceThisWeek / timeSpentThisWeek);
    let speedThisWeekTitle;
    if (!speedThisWeek) {
      speedThisWeekTitle = 'No records';
    } else if (speedThisWeek === 1) {
      speedThisWeekTitle = `${speedThisWeek.toPrecision(2)} mile/min.`;
    } else {
      speedThisWeekTitle = `${speedThisWeek.toPrecision(2)} miles/min.`;
    }
    const elSpeedThisWeek = (
      <div>
        Average Speed this week - {speedThisWeekTitle}
      </div>
    );
    return elSpeedThisWeek;
  }

  render() {
    const elDistanceThisWeek = this.getElDistanceThisWeek();
    const elSpeedThisWeek = this.getElSpeedThisWeek();

    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Header />
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
