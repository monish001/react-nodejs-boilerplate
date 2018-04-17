import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home";
import CreateRecord from "../CreateRecord";
import ViewRecords from "../ViewRecords";
import EditRecord from "../EditRecord";
import "./style.css";

import Login from "../Login";
import Register from "../Register";
// import EditRecord from '../EditRecord';
// <Route path="/api/logout" component={Logout} />

const App = () => (
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
        <Route path="/records/edit" component={EditRecord} />
      </div>
    </Router>{" "}
  </div>
);

export default App;
