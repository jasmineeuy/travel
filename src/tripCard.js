import React from "react";
import "./card.css";
import image from "./background.jpg";

class tripCard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      to: "",
      from: "",
      group: "",
      cost: "",
      msg: null,
    };
  }

  render() {
    const { name, location, to, from, group, cost } = this.props.trip;
    return (
      <div className="trip">
        <div className="l-card">
          <p>image</p>
          <img className="cardImage"></img>
        </div>
        <div className="r-card">
          <div className="r-row">
            <p className="Info" className="tripName">
              {name}
            </p>
          </div>
          <div className="r-row">
            <p className="Info">Location: {location}</p>
          </div>
          <div className="r-row">
            <p className="Info">From: {from}</p>
          </div>
          <div className="r-row">
            <p className="Info">To: {to}</p>
          </div>
          <div className="r-row">
            <p className="Info">Members: {group}</p>
          </div>
          <div className="r-row">
            <p className="Info">Total Cost: {cost}</p>
          </div>
        </div>
        <div>
          <button className="remove-card-btn">X</button>
        </div>
      </div>
    );
  }
}
/**/
export default tripCard;
