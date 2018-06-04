import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from '../Home';
import CreateRecord from '../CreateRecord';
import ViewRecords from '../ViewRecords';
import EditRecord from '../EditRecord';
import CreateUser from '../CreateUser';
import ViewUsers from '../ViewUsers';
import EditUser from '../EditUser';
import './style.css';
import Login from '../Login';
import Register from '../Register';
import reducer from '../../reducers';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <h1>Jogger App</h1>
      </header>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/records/create" component={CreateRecord} />
          <Route path="/records/view" component={ViewRecords} />
          <Route path="/records/edit/:CreatedTimeStamp" component={EditRecord} />
          <Route path="/users/create" component={CreateUser} />
          <Route path="/users/view" component={ViewUsers} />
          <Route path="/users/edit/:userId" component={EditUser} />
        </div>
      </Router>{' '}
    </div>
  </Provider>
);

export default App;
