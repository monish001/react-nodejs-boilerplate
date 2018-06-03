import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as Repository from '../../repositories/user';
import * as UserRecordsRepository from '../../repositories/user-record';
import Header from '../Header';

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this.onRemove = this.onRemove.bind(this);
  }

  componentWillMount() {
    // TODO loader
    UserRecordsRepository
      .read()
      .then((response) => {
        // console.log(response.data);
        this.setState({
          records: response.data,
        });
      }).catch(err => console.error(err));
  }

  onRemove(e, createdTimeStamp) {
    const isRemovalConfirmed = window.confirm('Do you really want to remove this record?');
    if (!isRemovalConfirmed) {
      return;
    }
    const { records } = this.state;
    UserRecordsRepository.remove(createdTimeStamp)
      .then(() => {
        const newRecords = records.filter(record => record.CreatedTimeStamp !== createdTimeStamp);
        this.setState({ records: newRecords });
      })
      .catch((err) => {
        console.error(err); // TODO
      });
  }

  render() {
    // TODO: move to proptypes
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
        <table className="margin-auto">
          <thead>
            <tr key={-1}>
              <th>Date</th>
              <th>Distance (in miles)</th>
              <th>Time (in mins)</th>
              <th>Average Speed</th>
              <th className="jgr--view-records--actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const { CreatedTimeStamp, DistanceInMiles, TimeDurationInMinutes } = record;
              const key = `${CreatedTimeStamp}::${UserId}`;
              const averageSpeed = DistanceInMiles &&
                (DistanceInMiles / TimeDurationInMinutes).toPrecision(2);
              return (
                <tr key={key}>
                  <td>{`${new Date(CreatedTimeStamp)}`}</td>
                  <td>{`${DistanceInMiles}`}</td>
                  <td>{`${TimeDurationInMinutes}`}</td>
                  <td>{`${averageSpeed}`}</td>
                  <td>
                    <Link href="# " to={`/records/edit/${CreatedTimeStamp}`}>Edit</Link>{' | '}
                    <a href="# " onClick={e => this.onRemove(e, CreatedTimeStamp)}>Remove</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      content = 'No records';
    }

    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Header />
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
