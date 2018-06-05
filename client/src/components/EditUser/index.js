import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style.css';
import Header from '../Header';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as UsersRepository from '../../repositories/user';

class EditUser extends Component {
  constructor(props) {
    super(props);
    const { userId } = this.props.match.params;
    this.state = {
      role: '',
      userName: '',
      _role: '', // to be used to store original values
      _userName: '',
      userId,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentWillMount() {
    this.fetchUser();
  }

  onSave() {
    const {
      role, userName, _role, _userName, userId,
    } = this.state;
    UsersRepository.update(userId, { Role: role, UserName: userName })
      .then(() => {
        this.props.dispatch({
          type: 'ADD_NOTIFICATION',
          notificationMessage: 'User updated successfully!',
        });
        this.setState({
          _role: role,
          _userName: userName,
        });
      })
      .catch((err) => {
        console.error(err); // TODO

        // revert the UI fields
        this.setState({
          role: _role,
          userName: _userName,
        });
      });
  }

  handleChange(event, key) {
    const newState = {};
    newState[key] = event.target.value;
    this.setState(newState);
  }

  fetchUser() {
    const { userId } = this.state;

    // TODO loader
    UsersRepository
      .read(userId)
      .then((response) => {
        const responseData = response && response.data && response.data.length && response.data[0];
        const {
          Role,
          UserName,
        } = responseData;
        this.setState({
          role: Role,
          userName: UserName,
          _role: Role,
          _userName: UserName,
        });
      }).catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { role, userName } = this.state;
    return (
      <div className="edit-user-page">
        <EnsureLoggedInContainer />
        <Header />
        <main>
          <h3>Edit User</h3>
        </main>
        <section>
          <label htmlFor="user-name">
            Username:
            <input id="user-name" type="text" value={userName} name="user-name" onChange={e => this.handleChange(e, 'userName')} />
          </label>
          <label htmlFor="user-role">
            Role:
            <select id="user-role" type="text" value={role} name="user-role" onChange={e => this.handleChange(e, 'role')}>
              <option value="REGULAR_USER">Regular user</option> {/* todo get list of roles from API. */}
              <option value="USER_MANAGER">User manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <a href="# " onClick={this.onSave}>Save</a>
        </section>
      </div>
    );
  }
}


// Specifies the default values for props:
EditUser.defaultProps = {
  dispatch: null,
};

EditUser.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(EditUser);
