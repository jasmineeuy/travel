import React from "react";
import Banner from "../components/Banner";
import "../css/Profile.css";
import { Redirect } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import TripCard from "../components/TripCard";
import TripModal from "../components/TripModal";

class Profile extends React.Component {
  state = {
    userId: null,
    trips: [],
    isLoading: true,
    view: false,
  };

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

  handleDelete = (id) => {
    this.setState(({ trips }) => ({
      trips: trips.filter((trip) => trip.id !== id),
    }));
  };

  handleCreate = (trip) => {
    this.setState(({ trips }) => ({
      trips: [trip, ...trips],
      view: false,
    }));
  };

  render() {
    if (!this.props.match.params.userid || !window.localStorage.getItem("id")) {
      return <Redirect to="/" />;
    }

    const { trips, isLoading, view } = this.state;

    return (
      <div>
        {view && (
          <TripModal
            onCreate={this.handleCreate}
            onClick={() => this.setState({ view: false })}
          />
        )}
        <Banner />
        <div className="mainBx">
          <div className="mainBx-0">{/* <p>Image</p> */}</div>
          <div className="mainBx-1">
            <div className="nameBx0">
              <h1>Trips</h1>
            </div>
            <div className="mainBx1">
              <div
                className="add-trip-btn"
                onClick={() => this.setState({ view: true })}
              >
                + add trip
              </div>
            </div>
            <div className="cardBx">
              {isLoading ? (
                <div className="loader">
                  <BeatLoader size={20} color={"#123abc"} />
                </div>
              ) : trips.length !== 0 ? (
                trips.map((trip) => (
                  <TripCard
                    onDelete={this.handleDelete}
                    trip={trip}
                    key={`trip-${trip.id}`}
                  />
                ))
              ) : (
                <p>You have no trips. Click add trip to create</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
