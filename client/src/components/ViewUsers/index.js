import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer';
import * as UserRepository from '../../repositories/user';
import Header from '../Header';

class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.onRemove = this.onRemove.bind(this);
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  componentWillMount() {
    this.fetchAllUsers();
  }

  onRemove(e, userId) {
    const isRemovalConfirmed = window.confirm('Do you really want to remove this user?');
    if (!isRemovalConfirmed) {
      return;
    }
    const { users } = this.state;
    UserRepository.remove(userId)
      .then(() => {
        const newUsers = users.filter(user => user.Id !== userId);
        this.setState({ users: newUsers });
      })
      .catch((err) => {
        console.error(err); // TODO
      });
  }

  fetchAllUsers() {
    // TODO loader
    UserRepository
      .readAll()
      .then((response) => {
        console.log(response.data);
        this.setState({
          users: response.data,
        });
      }).catch(err => console.error(err));
  }

  render() {
    const { users } = this.state;
    let content;

    if (users.length > 0) {
      content = (
        <table className="margin-auto">
          <thead>
            <tr key={-1}>
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created at</th>
              <th>Last modified at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const {
                CreatedTimeStamp,
                Id,
                UserName,
                Role,
                LastModifiedTimeStamp,
              } = user;
              const key = `${LastModifiedTimeStamp}::${Id}`;
              return (
                <tr key={key}>
                  <td>{`${Id}`}</td>
                  <td>{`${UserName}`}</td>
                  <td>{`${Role}`}</td>
                  <td>{`${CreatedTimeStamp}`}</td>
                  <td>{`${LastModifiedTimeStamp}`}</td>
                  <td>
                    <Link href="# " to={`/users/edit/${Id}`}>Edit</Link>{' | '}
                    <a href="# " onClick={e => this.onRemove(e, Id)}>Remove</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      content = 'No users';
    }

    return (
      <div className="App">
        <EnsureLoggedInContainer />
        <Header />
        <main>
          <h3>Users:</h3>
        </main>
        <section>
          {content}
        </section>
      </div>
    );
  }
}
export default ViewUsers;
