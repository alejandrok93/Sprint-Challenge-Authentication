import React from "react";
import Login from "./Login";

const authenticate = HOCApp =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loggedIn: false };
    }

    componentDidMount() {
      //check local storage to see if JWT token exists
      if (localStorage.getItem("jwt")) {
        console.log("found jwt");
        this.setState({ loggedIn: true });
      }
    }

    render() {
      if (this.state.loggedIn === true) {
        return <HOCApp />;
      } else return <Login />;
    }
  };

export default authenticate;
