import React from "react";
import Banner from "./banner";
import "./user.css";
import { Redirect, Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import TripCard from "./tripCard";
import Card from "./card";
import { withRouter } from "react-router-dom";

class UserPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      trips: [],
      isLoading: true,
      view: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.userid;
    fetch(`/api/trip/${id}/alltrips`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          trips: data.userTrip,
          isLoading: false,
        });
      });
  }

  nextPath(path) {
    this.props.history.push(path);
  }
  render() {
    if (!this.props.match.params.userid) {
      return <Redirect to="/" />;
    }
    const { trips, isLoading, view } = this.state;
    console.log(trips);
    return (
      <div>
        {view && <Card onClick={() => this.setState({ view: false })} />}
        <Banner />
        <div className="mainBx">
          <div className="mainBx-0">
            <p>Image</p>
          </div>
          <div className="mainBx-1">
            <div className="nameBx0">
              <h1>Trips</h1>
            </div>
            <div className="mainBx1">
              <button
                className="add-trip-btn"
                onClick={() => this.setState({ view: true })}
              >
                + add trip
              </button>
            </div>
            <div className="cardBx">
              {isLoading ? (
                <div className="loader">
                  <BeatLoader size={20} color={"#123abc"} />
                </div>
              ) : trips.length !== 0 ? (
                trips.map((trip) => (
                  <TripCard trip={trip} key={`trip-${trip.id}`} />
                ))
              ) : (
                "You have no trips. Click add trip to create"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPg;
