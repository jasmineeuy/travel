import React from "react";
import "./form.css";
import LogOn from "./LogOn";
import { Switch, Route, Link, Redirect } from "react-router-dom";

class Formfield extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      registered: false,
      msg: null,
    };
  }

  handleEvent = (e) => {
    e.preventDefault();
    fetch("/api/auth/signup", {
      method: "post",
      body: JSON.stringify(this.state),
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
          registered: true,
        });
      })

      .catch((err) => {
        console.log(err.response.message);
      });
  };

  handleEvenChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  };

  render() {
    const { name, email, password, msg, registered } = this.state;
    if (registered) {
      return <Redirect to={`/profile/${window.localStorage.getItem("id")}`} />;
    }
    return (
      <div className="nForm">
        <div className="mCard">
          <div className="nameCard">
            <p className="wform"> Sign Up</p>
          </div>
          {msg && <div>{msg}</div>}
          <div className="newForm">
            <form onSubmit={this.handleEvent}>
              <div className="row1">
                <div>
                  <p className="memName">Name</p>
                </div>
                <div>
                  <input
                    className="typename"
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.handleEvenChange}
                  ></input>
                </div>
              </div>
              <div className="row1">
                <div>
                  <p className="userEmail">Email</p>
                </div>
                <div>
                  <input
                    className="typename"
                    name="email"
                    value={email}
                    onChange={this.handleEvenChange}
                  ></input>
                </div>
              </div>

              <div className="row1">
                <div>
                  <p className="UserPass">Password </p>
                </div>
                <div>
                  <input
                    class="typename"
                    name="password"
                    value={password}
                    onChange={this.handleEvenChange}
                  ></input>
                </div>
              </div>

              <div>
                <button className="account">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Formfield;
