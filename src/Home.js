import React from "react";
import Banner from "./banner";
import "./home.css";

import { Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="HomeApp">
        <Banner />
        <div className="mainBox">
          <div className="mainBox-0">
            <p>Join travlr keep all your trips in one place</p>
          </div>
          <div className="mainBox-1">
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
