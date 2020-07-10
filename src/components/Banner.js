import React from "react";
import { Redirect } from "react-router-dom";
import "../css/Banner.css";

class Banner extends React.Component {
  state = {
    redirect: false,
  };

  handleClick = () => {
    window.localStorage.removeItem("id");

    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <header className="borderName">
        <div className="mainName">Travlr</div>
        {window.localStorage.getItem("id") && (
          <button className="logout-btn" onClick={this.handleClick}>
            Logout
          </button>
        )}
      </header>
    );
  }
}

export default Banner;
