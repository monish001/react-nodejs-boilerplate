import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as Repository from '../../repositories/user';
import Nav from '../Nav';

class Home extends Component {
  render() {
    const data = [
      {
        date: '12 jan 2018',
        DistanceInMiles: 2,
        TimeDurationInMinutes: 60,
        CreatedTimeStamp: 1515924253213,
        LastModifiedTimeStamp: 1523958286105,
      },
    ];
    const UserId = Repository.getUserId();
    let content;

    if (data.length > 0) {
      content = (
        <ul className="no-list-style-type">
          <li key={-1}>
            Date | Distance (in miles) | Time (in mins) | Actions
          </li>
          {data.map((row) => {
            const { CreatedTimeStamp, DistanceInMiles, TimeDurationInMinutes } = row;
            const key = `${CreatedTimeStamp}::${UserId}`;
            return (
              <li key={key}>
                {`${new Date(CreatedTimeStamp)} | ${DistanceInMiles} | ${TimeDurationInMinutes} | `}
                <Link to="/records/edit">Edit</Link>{' | '}
                <a
                  href="#"
                  onClick={() =>
                    window.confirm('Do you really want to remove this record?')}
                >
                  Remove
                </a>
              </li>
            );
          })}
        </ul>
      );
    } else {
      content = 'No records';
    }

    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Nav />
        <main>
          <h3>Records:</h3>
        </main>
        <section>
          {content}
        </section>
      </div>
    );
  }
}

export default Home;
