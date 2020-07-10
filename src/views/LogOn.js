import React from "react";
import "../css/Logon.css";
import { Redirect } from "react-router-dom";

class LogOn extends React.Component {
  state = {
    email: "",
    password: "",
    authenticated: window.localStorage.getItem("id") !== null,
    msg: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const state = this.state;

    fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if ("message" in data) {
          this.setState({
            msg: data.message,
          });
          return;
        }

        window.localStorage.setItem("id", data.id);
        this.setState({
          authenticated: true,
        });
      })
      .catch((err) => {
        console.log("error response:" + err.response.message);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password, msg, authenticated } = this.state;

    if (authenticated) {
      return <Redirect to={`/profile/${window.localStorage.getItem("id")}`} />;
    }

    return (
      <div className="Login-Form">
        <p className="name-form ">Login</p>
        {msg && <div>{msg}</div>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className="ninput"
              name="email"
              placeholder="Email"
              value={email}
              type="email"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <input
              className="ninput"
              name="password"
              placeholder="Password"
              value={password}
              type="password"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <button className="submit-btn">submit</button>
          </div>
        </form>
        <div className="gb-link">
          <button onClick={() => this.props.history.goBack()}>
            Click here to go back
          </button>
        </div>
      </div>
    );
  }
}

export default LogOn;
