import React from "react";
import Center from "../components/Center";
import SignUp from "./SignUp";
import LogOn from "./LogOn";
import Home from "./Home";
import Profile from "./Profile.js";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route
          path="/login"
          render={(routerProps) => (
            <Center>
              <LogOn {...routerProps} />
            </Center>
          )}
        ></Route>
        <Route
          path="/signup"
          render={(routerProps) => (
            <Center>
              <SignUp {...routerProps} />
            </Center>
          )}
        ></Route>
        <Route path="/profile/:userid" component={Profile}></Route>
      </Switch>
    </div>
  );
}
/**/
export default App;
