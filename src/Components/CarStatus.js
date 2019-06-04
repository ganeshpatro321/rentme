import React from "react";
import CustomForm from "./CustomForm";
import CustomCard from "./CustomCard";
import moment from "moment";
import { Segment, Form, Select } from "semantic-ui-react";

class CarStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carDetails: [],
      filteredCars: [],
      carType: "Any",
      fuelType: "Any",
      transmission: "Any"
    };
  }

  componentDidMount() {
    if (this.props.carDetails) {
      this.setState(
        {
          carDetails: this.props.carDetails,
          location: this.props.location,
          date: this.props.date
        }
        );
        this.getAvailableCars();
    }
  }

  componentDidUpdate = () => {
      if(this.props.location !== this.state.location){
          console.log(this.state.location)
          console.log(this.props.location)
          this.setState({
              location: this.props.location
          }, () => {
            this.getAvailableCars();
          })
          
      }
  }

  handleChange = ( e, result) => {
      const {name, value} = result;
      this.setState({
        [name] : value
        }, () => {
            this.getAvailableCars();
        })
  }

  availabilityCheck = (date, availability) => {
    date = moment(date, "YYYY-MM-DD");
    availability = availability.split(/[ ,]+/);
    let day = date.format("ddd");
    if (availability.indexOf(day) > -1) {
      return true;
    }
    return false;
  };

  getAvailableCars = () => {
    const temp = this.props.carDetails.filter(
      car => car.location === this.props.location
    );
    temp.forEach(car => {
      car.isAvailable = this.availabilityCheck(
        this.props.date,
        car.availability
      );
    });
    this.sortAvailability(temp);

    this.setState({
      filteredCars: temp
    },() => {
        console.log("Called")
    });
  };    


  sortAvailability = temp => {
    temp.sort((a, b) => {
      if (a.isAvailable > b.isAvailable) return -1;
      if (b.isAvailable > a.isAvailable) return 1;
    });
  };

  render() {
    console.log(this.state)
    var defaultType = {
      key: "Any",
      text: "Any",
      value: "Any"
    };
    const carTypeOptions = [defaultType];
    const fuelTypeOptions = [defaultType];
    const transmissionOptions = [defaultType];
    const map = new Map();
    for (const carInstance of this.props.carDetails) {
      if (!map.has(carInstance.car_Type)) {
        map.set(carInstance.car_Type, true);
        carTypeOptions.push({
          key: carInstance.car_Type,
          text: carInstance.car_Type,
          value: carInstance.car_Type
        });
      }
      if (!map.has(carInstance.fuel_Type)) {
        map.set(carInstance.fuel_Type, true);
        fuelTypeOptions.push({
          key: carInstance.fuel_Type,
          text: carInstance.fuel_Type,
          value: carInstance.fuel_Type
        });
      }
      if (!map.has(carInstance.transmission)) {
        map.set(carInstance.transmission, true);
        transmissionOptions.push({
          key: carInstance.transmission,
          text: carInstance.transmission,
          value: carInstance.transmission
        });
      }
    }
    return (
      <div>
        <div style={{ width: "800px", margin: "auto", marginTop: "50px" }}>
          <CustomForm
            landing={false}
            carDetails={this.props.carDetails}
            location={this.props.location}
            date={this.props.date}
          />
        </div>
        <div>
          <Segment inverted>    
            <Form inverted>
              <Form.Group widths="equal">
                <Form.Field
                  name="carType"
                  control={Select}
                  options={carTypeOptions}
                  label={{
                    children: "Car Type",
                    htmlFor: "form-select-control-gender"
                  }}
                  defaultValue={this.state.carType}
                  onChange={this.handleChange}
                />
                <Form.Field
                  name="fuelType"
                  control={Select}
                  options={fuelTypeOptions}
                  label={{
                    children: "Fuel Type",
                    htmlFor: "form-select-control-gender"
                  }}
                  defaultValue={this.state.fuelType}
                  onChange={this.handleChange}
                />
                <Form.Field
                  name="transmission"
                  control={Select}
                  options={transmissionOptions}
                  label={{
                    children: "Transmission Type",
                    htmlFor: "form-select-control-gender"
                  }}
                  defaultValue={this.state.transmission}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Segment>
        </div>
        <div style={{ margin: "auto" }}>
          {this.state.filteredCars.map(carItemDetail => (
            <CustomCard
              carItemDetail={carItemDetail}
              landing={false}
              carDetails={this.props.carDetails}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CarStatus;
