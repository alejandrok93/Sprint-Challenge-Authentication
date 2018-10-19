import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Authenticate from "./components/Authenticate";

class App extends Component {
  constructor() {
    super();
    this.state = {
      jokes: []
    };
  }
  componentDidMount() {
    const url = "http://localhost:3300/api/jokes";
    const token = localStorage.getItem("jwt");
    console.log(token);
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(url, options)
      .then(response => this.setState({ jokes: response.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <h1>Jokes app:</h1>
        <div className="jokes-container">
          {this.state.jokes.map(joke => {
            return (
              <div className="joke">
                <p>{joke.setup}</p>
                <p>
                  <em>
                    <i>{joke.punchline}</i>
                  </em>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Authenticate(App);
