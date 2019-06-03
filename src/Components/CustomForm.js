import React from "react";
import { Button, Select, Form } from "semantic-ui-react";
import { Redirect } from 'react-router';
import { DatePicker } from 'antd';

import 'antd/dist/antd.css';

class CustomForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          location: "",
          date: "",
          dateIndex: ""
        }
    }

  handleDateChange = selectedDate => {
      console.log(selectedDate._d.toDateString());
      this.setState({
        dateIndex: selectedDate._d.getDay()
      })
  };

  handleChange = (e, data) => {
    this.setState({
      location: data.value
    })
  }

  handleSubmit = () => {
    console.log(this.state);
  }

  render(){  
  const locationOptions = [];
  const map = new Map();
  for (const carInstance of this.props.carDetails){
    if(!map.has(carInstance.location)){
      map.set(carInstance.location, true);
      locationOptions.push({
            key: carInstance.location,
            text: carInstance.location,
            value: carInstance.location
      })    
    }
  }

  return (
    <Form>
      <Form.Field>
        <label>Location</label>
        <Select placeholder='Select your location' options={locationOptions} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Date</label>
        <DatePicker  onChange = {this.handleDateChange}/>
      </Form.Field>
      <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
    </Form>
  );
};
};

export default CustomForm;
