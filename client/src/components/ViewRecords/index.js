import Nav from "../Nav";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import EnsureLoggedInContainer from "../../containers/EnsureLoggedInContainer";

class Home extends Component {
  render() {
    const data = [
      {
        date: "12 jan 2018",
        DistanceInMiles: 2,
        TimeDurationInMinutes: 60
      }
    ];
    let content;

    if (data.length > 0) {
      content = (
        <ul className="no-list-style-type">
          <li key={-1}>
            Date | Distance (in miles) | Time (in mins) | Actions
          </li>
          {data.map(function(row, index) {
            return (
              <li key={index}>
                {row.date}
                {" "}
                |
                {" "}
                {row.DistanceInMiles}
                {" "}
                |
                {" "}
                {row.TimeDurationInMinutes}
                {" "}
                |
                {" "}
                <Link to="/records/edit">Edit</Link>
                {" "}
                |
                {" "}
                <a
                  href="#"
                  onClick={() =>
                    window.confirm("Do you really want to remove this record?")}
                >
                  Remove
                </a>
              </li>
            );
          })}
        </ul>
      );
    } else {
      content = "No records";
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
