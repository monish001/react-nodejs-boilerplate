import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as Repository from '../../repositories/user';
import * as UserRecordsRepository from '../../repositories/user-record';
import Nav from '../Nav';

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
  }

  componentWillMount() {
    // TODO loader
    UserRecordsRepository
      .get()
      .then((response) => {
        console.log(response.data);
        this.setState({
          records: response.data,
        });
      }).catch(err => console.error(err));
  }

  render() {
    // CreatedTimeStamp
    // :
    // 1515924253213
    // DistanceInMiles
    // :
    // 61.61
    // LastModifiedTimeStamp
    // :
    // 1523958286105
    // TimeDurationInMinutes
    // :
    // 61
    // UserId
    // :
    // "116fa1c6-82aa-4288-afea-c1d9477fb05d"
    const { records } = this.state;
    const UserId = Repository.getUserId();
    let content;

    if (records.length > 0) {
      content = (
        <ul className="no-list-style-type">
          <li key={-1}>
            Date | Distance (in miles) | Time (in mins) | Actions
          </li>
          {records.map((record) => {
            const { CreatedTimeStamp, DistanceInMiles, TimeDurationInMinutes } = record;
            const key = `${CreatedTimeStamp}::${UserId}`;
            return (
              <li key={key}>
                {`${new Date(CreatedTimeStamp)} | ${DistanceInMiles} | ${TimeDurationInMinutes} | `}
                <Link to={`/records/edit/${CreatedTimeStamp}`}>Edit</Link>{' | '}
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
export default ViewRecords;
