import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }

  handleInput(e) {
    console.log(e.target.value);
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(this.props);
    if (!user.username || !user.password) {
      alert("Please sign in ");
    }
    const url = "http://localhost:3300/api/login";
    axios
      .post(url, user)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("jwt", response.data.token);
      })
      .catch(err => console.log(err));

    this.setState({ username: "", password: "" });
  }
  render() {
    return (
      <div className="login-form">
        <h1>Please log in: </h1>
        <form>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={e => this.handleInput(e)}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleInput(e)}
            placeholder="Password"
          />
          <button onClick={e => this.handleSubmit(e)}>Login</button>
        </form>

        <a className="jokes-link" href="/">
          Tell me Jokes!
        </a>
      </div>
    );
  }
}

export default Login;
