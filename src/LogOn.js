import React from "react";
import "./logon.css";
import { Redirect } from "react-router-dom";

class LogOn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      authenticated: false,
      msg: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const state = this.state;
    console.log(state);
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

        console.log("i:" + data);
        window.localStorage.setItem("id", data.id);
        this.setState({
          authenticated: true,
        });
      })
      .catch((err) => {
        console.log("error response:" + err.response.message);
      });
    console.log("above:" + this.state);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  };

  render() {
    const { email, password, msg, authenticated } = this.state;
    if (authenticated) {
      console.log("authenticated");
      return <Redirect to={`/profile/${window.localStorage.getItem("id")}`} />;
    }

    console.log(msg);
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
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <input
              className="ninput"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            ></input>
          </div>

          <div>
            <button className="butn">submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogOn;
