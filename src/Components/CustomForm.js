import React from "react";
import { Button, Select, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { DatePicker } from "antd";
import moment from 'moment';

import "antd/dist/antd.css";

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      date: ""
    };
  }

  componentDidMount() {
      if(this.props.location || this.props.date){
      this.setState({
        location: this.props.location,
        date: this.props.date
      })
    }
  }

  componentDidUpdate(prevState) {
  if(prevState.location !== this.props.location || prevState.date !== this.props.date){
    this.setState({
      redirect: false,
      location: this.props.location,
      date: this.props.date
    })
  }
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

    if (this.state.redirect ) {
      return <Redirect to={`/car/${this.state.location}/${this.state.date}`} />;
    }
    const dateFormat = 'YYYY-MM-DD';

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
                onChange={this.handleChange}
                defaultValue={this.props.location}
              />
            <Form.Field>
              <label>Date</label>
              <DatePicker onChange={this.handleDateChange} defaultValue={moment(this.props.date, dateFormat)} />
            </Form.Field>
            <Button type="submit" onClick={this.handleSubmit} >
              Submit
            </Button>
            </Form.Group>
          </Form>
          </div>
        )}
      </div>
    );
  }
}

export default CustomForm;
