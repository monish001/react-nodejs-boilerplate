import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../Header';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as UserRecordsRepository from '../../repositories/user-record';
import * as Utilities from '../../utilities';
import * as StorageHelper from '../../adaptors/storage';

function getContentDomForUserManager() {
  return (
    <section>
      <ul className="no-list-style-type">
        <li>
          <Link href="# " to="/users/view">View Users</Link>
        </li>
        <li>
          <Link href="# " to="/users/create">Create New User</Link>
        </li>
      </ul>
    </section>);
}

function getContentDomForAdmin() {
  return (
    <section>
      <ul className="no-list-style-type">
        <li>
          <Link href="# " to="/users/view">View Users</Link>
        </li>
        <li>
          <Link href="# " to="/users/create">Create New User</Link>
        </li>
        <li>
          <Link href="# " to="/records/view">View Records</Link>
        </li>
        <li>
          <Link href="# " to="/records/create">Create New Record</Link>
        </li>
      </ul>
    </section>);
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceThisWeek: null,
      timeSpentThisWeek: null,
    };
    this.fetchUserRecords = this.fetchUserRecords.bind(this);
    this.getElDistanceThisWeek = this.getElDistanceThisWeek.bind(this);
    this.getElSpeedThisWeek = this.getElSpeedThisWeek.bind(this);
  }

  componentWillMount() {
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

  getContentDomForRegularUser() {
    this.fetchUserRecords();
    const elDistanceThisWeek = this.getElDistanceThisWeek();
    const elSpeedThisWeek = this.getElSpeedThisWeek();
    return (
      <section>
        {elDistanceThisWeek}
        {elSpeedThisWeek}
        <ul className="no-list-style-type">
          <li>
            <Link href="# " to="/records/view">View Records</Link>
          </li>
          <li>
            <Link href="# " to="/records/create">Create New Record</Link>
          </li>
        </ul>
      </section>);
  }

  fetchUserRecords() {
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

  render() {
    const user = StorageHelper.getItem('user');
    const userRole = user && user.Role;
    let elContent = '';

    if (userRole === 'REGULAR_USER') {
      elContent = this.getContentDomForRegularUser();
    } else if (userRole === 'USER_MANAGER') {
      elContent = getContentDomForUserManager();
    } else if (userRole === 'ADMIN') {
      elContent = getContentDomForAdmin();
    }

    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Header />
        <main>
          <h3>Home</h3>
        </main>
        {elContent}
      </div>
    );
  }
}

export default Home;
