import React from "react";
import { Button, Select, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { DatePicker } from "antd";

import "antd/dist/antd.css";

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      date: ""
    };
  }

  handleDateChange = selectedDate => {
    this.setState({
      date: selectedDate._d.toISOString().slice(0, 10)
    });
  };

  handleChange = (e, data) => {
    this.setState({
      location: data.value
    });
  };

  handleSubmit = () => {
    if (this.state.location === "") {
      alert("Please enter location");
    } else if (this.state.date === "") {
      alert("Please select date");
    } else {
      this.setState({ redirect: true });
    }
  };

  render() {
    const locationOptions = [];
    const map = new Map();
    for (const carInstance of this.props.carDetails) {
      if (!map.has(carInstance.location)) {
        map.set(carInstance.location, true);
        locationOptions.push({
          key: carInstance.location,
          text: carInstance.location,
          value: carInstance.location
        });
      }
    }

    if (this.state.redirect) {
      return <Redirect to={`/car/${this.state.location}/${this.state.date}`} />;
    }

    return (
      <div>
        {this.props.landing ? (
          <Form>
            <Form.Field>
              <label>Location</label>
              <Select
                placeholder="Select your location"
                options={locationOptions}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <DatePicker onChange={this.handleDateChange} />
            </Form.Field>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        ) : (
          <div>
          <Form>
            <Form.Group widths="equal">
            <Form.Select
                fluid
                label="Location"
                options={locationOptions}
                placeholder="Select Your location"
              />
            <Form.Field>
              <label>Date</label>
              <DatePicker onChange={this.handleDateChange} />
            </Form.Field>
            </Form.Group>
          </Form>
          </div>
        )}
      </div>
    );
  }
}

export default CustomForm;
