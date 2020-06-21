import React from "react";
import logo from "./logo.svg";
//import * as styles from "./App.css";

import FormEx from "./form";
import LogOn from "./LogOn";
import Banner from "./banner";
import Home from "./Home";
import Card from "./card";
//import TCard from "./tripCard.js";
import UserPg from "./user-main.js";
import { Switch, Route, Link, Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/login" component={LogOn}></Route>
          <Route path="/profile/:userid" component={UserPg}></Route>
          <Route path="/signup" component={FormEx}></Route>
          <Route path="/newtrip" component={Card}></Route>
        </Switch>
      </div>
    );
  }
}
/**/
export default App;
