import React from "react";
import "../css/Card.css";

class TripCard extends React.Component {
  constructor(props) {
    super(props);

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

  handleClick = () => {
    const { trip, onDelete } = this.props;

    fetch(`/api/trip/${trip.id}`, {
      method: "delete",
    })
      .then((data) => data.json())
      .then((data) => {
        if ("message" in data) {
          return alert(data.message);
        }

        onDelete(trip.id);
      });
  };

  render() {
    const { name, location, to, from, group, cost, imgUrl } = this.props.trip;

    return (
      <div className="trip">
        <div>
          <img className="cardImage" alt="location_image" src={imgUrl}></img>
        </div>
        <div className="r-card">
          <div className="r-row">
            <p className="Info tripName">{name}</p>
          </div>
          <div className="r-row">
            <p className="Info">Location: {location}</p>
          </div>
          <div className="r-row">
            <p className="Info">From: {new Date(from).toDateString()}</p>
          </div>
          <div className="r-row">
            <p className="Info">To: {new Date(to).toDateString()}</p>
          </div>
          <div className="r-row">
            <p className="Info">Members: {group}</p>
          </div>
          <div className="r-row">
            <p className="Info">Total Cost: {cost}</p>
          </div>
        </div>
        <div>
          <button className="remove-card-btn" onClick={this.handleClick}>
            X
          </button>
        </div>
      </div>
    );
  }
}

export default TripCard;
