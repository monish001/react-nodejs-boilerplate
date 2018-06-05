import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style.css';
import Header from '../Header';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as UserRecordsRepository from '../../repositories/user-record';

class EditRecord extends Component {
  constructor(props) {
    super(props);
    const createdTimeStamp = this.props.match.params.CreatedTimeStamp;
    this.state = {
      distanceInMiles: '',
      timeDurationInMinutes: '',
      _distanceInMiles: '', // to be used to store original values
      _timeDurationInMinutes: '',
      createdTimeStamp,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    const { createdTimeStamp } = this.state;

    // TODO loader
    UserRecordsRepository
      .read(createdTimeStamp)
      .then((response) => {
        const responseData = response && response.data && response.data.length && response.data[0];
        // console.log(responseData);
        this.setState({
          distanceInMiles: responseData.DistanceInMiles,
          timeDurationInMinutes: responseData.TimeDurationInMinutes,
          _distanceInMiles: responseData.DistanceInMiles,
          _timeDurationInMinutes: responseData.TimeDurationInMinutes,
        });
      }).catch((err) => {
        console.error(err);
      });
  }

  onSave() {
    const {
      _timeDurationInMinutes, _distanceInMiles,
      timeDurationInMinutes, distanceInMiles, createdTimeStamp,
    } = this.state;
    UserRecordsRepository.update(createdTimeStamp, { timeDurationInMinutes, distanceInMiles })
      .then(() => {
        this.props.dispatch({
          type: 'ADD_NOTIFICATION',
          notificationMessage: 'Record updated successfully!',
        });
        this.setState({
          _timeDurationInMinutes: timeDurationInMinutes,
          _distanceInMiles: distanceInMiles,
        });
      })
      .catch((err) => {
        console.error(err); // TODO

        // revert the UI fields
        this.setState({
          timeDurationInMinutes: _timeDurationInMinutes,
          distanceInMiles: _distanceInMiles,
        });
      });
  }

  handleChange(event, key) {
    const newState = {};
    newState[key] = event.target.value;
    this.setState(newState);
  }

  render() {
    const { timeDurationInMinutes, distanceInMiles } = this.state;
    return (
      <div className="edit-record-page">
        <EnsureLoggedInContainer />
        <Header />
        <main>
          <h3>Edit Record</h3>
        </main>
        <section>
          <label htmlFor="distance">
            Distance (in miles):
            <input id="distance" type="text" value={distanceInMiles} name="distance" onChange={e => this.handleChange(e, 'distanceInMiles')} />
          </label>
          <label htmlFor="time">
            Time spent (in mins):
            <input id="time" type="text" value={timeDurationInMinutes} name="time" onChange={e => this.handleChange(e, 'timeDurationInMinutes')} />
          </label>
          <a href="# " onClick={this.onSave}>Save</a>
        </section>
      </div>
    );
  }
}


// Specifies the default values for props:
EditRecord.defaultProps = {
  dispatch: null,
};

EditRecord.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      CreatedTimeStamp: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(EditRecord);
