import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Authenticate from "./components/Authenticate";
import Joke from "./components/Joke";

class App extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      joke: "",
      index: 0
    };
  }
  componentDidMount() {
    this.getMoreJokes();
  }

  getMoreJokes() {
    console.log(this.state);
    console.log("getting more jokes");
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
      .then(response =>
        this.setState(
          { jokes: response.data, joke: response.data[0], index: 0 },
          console.log(this.state)
        )
      )
      .catch(err => console.log(err));
  }
  nextJoke() {
    if (this.state.index >= 7) {
      this.getMoreJokes();
    }
    this.state.index++;

    if (this.state.joke) {
      this.setState({
        ...this.state,
        joke: this.state.jokes[this.state.index + 1]
      });
    }
  }

  previousJoke() {
    if (this.state.index >= 1) {
      this.getMoreJokes();
    }
    this.state.index--;

    if (this.state.joke) {
      this.setState({
        ...this.state,
        joke: this.state.jokes[this.state.index - 1]
      });
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="header">
          <h1>dad jokes </h1>
          <div className="emoji" />
          <div className="emoji" />
          <div className="emoji" />
        </div>
        <div className="jokes-container">
          <div className="next" onClick={this.previousJoke.bind(this)}>
            prev
          </div>

          {<Joke joke={this.state.joke} />}
          <div className="next" onClick={this.nextJoke.bind(this)}>
            next
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticate(App);
