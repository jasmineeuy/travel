import React from "react";
import DatePicker from "react-datepicker";
import "./card.css";
import "react-datepicker/dist/react-datepicker.css";

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      to: new Date(),
      from: new Date(),
      group: "",
      cost: "",
      msg: null,
      isfocused: true,
    };
  }

  handleEvent = (e) => {
    e.preventDefault();
    const { name, location, to, from, group, cost } = this.state;
    const { onClick } = this.props;
    if (!name && !location && !to && !from && !group && !cost) {
      return onClick();
    }
    fetch(`/api/trip/${this.props.id}/newtrip/`, {
      method: "post",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if ("message" in data)
          this.setState({
            msg: data.message,
          });
        //onClick();
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  handleEventChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, location, to, from, group, cost, msg } = this.state;
    return (
      <div className="mainCard">
        <div className="left-card">
          <p>IMAGE</p>
        </div>

        <div className="right-card">
          <form onSubmit={this.handleEvent}>
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
              <p>Memebers</p>
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
              <button className="cardBtn">Add/Close</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Card;
