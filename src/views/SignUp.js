import React from "react";
import "../css/SignUp.css";
import { Redirect, Link } from "react-router-dom";

class Formfield extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    registered: window.localStorage.getItem("id") !== null,
    msg: null,
  };

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
  };

  render() {
    const { name, email, password, msg, registered } = this.state;

    if (registered) {
      return <Redirect to={`/profile/${window.localStorage.getItem("id")}`} />;
    }

    return (
      <div className="nForm">
        <div className="mCard">
          <div>
            <p className="wform"> Sign Up</p>
          </div>
          {msg && <div>{msg}</div>}
          <div>
            <form onSubmit={this.handleEvent}>
              <div className="row1">
                <input
                  className="typename"
                  name="name"
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={this.handleEvenChange}
                ></input>
              </div>
              <div className="row1">
                <input
                  className="typename"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleEvenChange}
                ></input>
              </div>
              <div className="row1">
                <input
                  className="typename"
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleEvenChange}
                ></input>
              </div>
              <div>
                <button className="account">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="gb-link">
          <button onClick={() => this.props.history.goBack()}>
            Click here to go back
          </button>
        </div>
      </div>
    );
  }
}

export default Formfield;
