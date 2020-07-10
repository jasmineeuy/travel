import React from "react";
import DatePicker from "react-datepicker";
import "../css/Card.css";
import "react-datepicker/dist/react-datepicker.css";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      to: new Date(),
      from: new Date(),
      group: "",
      cost: "",
      msg: null,
      isfocused: true,
      imgUrl: "",
    };

    this.inputRef = React.createRef();
  }

  handleClose = () => {
    const onClick = this.props.onClick;

    onClick();
  };

  handleClick = (e) => {
    e.preventDefault();

    const { name, location, to, from, group, cost, imgUrl } = this.state;
    const { onCreate } = this.props;

    const id = window.localStorage.getItem("id");

    fetch(`/api/trip/${id}/newtrip/`, {
      method: "post",
      body: JSON.stringify({ name, location, to, from, group, cost, imgUrl }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if ("message" in data)
          return this.setState({
            msg: data.message,
          });

        onCreate(data.trip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEventChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      msg: "",
    });
  };

  handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.setState({ img: event.target.result });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    const { name, location, to, from, group, cost, msg, imgUrl } = this.state;

    return (
      <div className="mainCard-wrapper">
        <div className="mainCard">
          <div className="left-card">
            <img
              className="img-input"
              draggable="false"
              src={imgUrl}
              alt="location_image"
              onError={() => {
                if (imgUrl) {
                  this.setState({ msg: "Invalid image url" });
                }
              }}
            />
          </div>

          <div className="right-card">
            <form>
              <div className="right-row">{msg && <div>{msg}</div>}</div>
              <div className="right-row">
                <p>Trip Name</p>
                <input
                  className="tripInfo"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.handleEventChange}
                ></input>
              </div>
              <div className="right-row">
                <p>Location</p>
                <input
                  className="tripInfo"
                  name="location"
                  type="text"
                  value={location}
                  onChange={this.handleEventChange}
                ></input>
              </div>
              <div className="right-row">
                <p>From</p>
                <DatePicker
                  type="text"
                  name="from"
                  selected={from}
                  className="tripInfo"
                  onSelect={this.handleSelect}
                  onChange={(date) =>
                    this.handleEventChange({
                      target: { name: "from", value: date },
                    })
                  }
                />
              </div>
              <div className="right-row">
                <p>To</p>

                <DatePicker
                  type="text"
                  name="to"
                  selected={to}
                  className="tripInfo"
                  onChange={(date) =>
                    this.handleEventChange({
                      target: { name: "to", value: date },
                    })
                  }
                />
              </div>
              <div className="right-row">
                <p>Members</p>
                <input
                  className="tripInfo"
                  name="group"
                  type="text"
                  value={group}
                  onChange={this.handleEventChange}
                ></input>
              </div>
              <div className="right-row">
                <p>Total Cost</p>
                <input
                  className="tripInfo"
                  name="cost"
                  type="text"
                  value={cost}
                  onChange={this.handleEventChange}
                ></input>
              </div>
              <div className="right-row">
                <p>Image Url</p>
                <input
                  className="tripInfo"
                  name="imgUrl"
                  type="text"
                  value={imgUrl}
                  onChange={this.handleEventChange}
                ></input>
              </div>
              <div className="right-row">
                <div className="btn-container">
                  <button className="cardBtn" onClick={this.handleClose}>
                    Close
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="cardBtn"
                    onClick={this.handleClick}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
