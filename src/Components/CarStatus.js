import React from "react";
import CustomForm from "./CustomForm";
import CustomCard from "./CustomCard";
import moment from "moment";
import SearchInput, {createFilter} from 'react-search-input';
import { Segment, Form, Select, Card, Image } from "semantic-ui-react";

class CarStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carDetails: [],
      filteredCars: [],
      carType: "Any",
      fuelType: "Any",
      transmission: "Any",
      priceOrder: "Low To High",
      searchTerm: ""
    };
  }

  componentDidMount() {
    if (this.props.carDetails) {
      this.setState({
        carDetails: this.props.carDetails,
        location: this.props.location,
        date: this.props.date
      });
      this.getAvailableCars();
    }
  }

  componentDidUpdate = () => {
    if (this.props.location !== this.state.location) {
      console.log(this.state.location);
      console.log(this.props.location);
      this.setState(
        {
          location: this.props.location
        },
        () => {
          this.getAvailableCars();
        }
      );
    }
  };

  handleChange = (e, result) => {
    const { name, value } = result;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.getAvailableCars();
      }
    );
  };

  searchUpdated = (term) => {
      this.setState({searchTerm: term}, () => {
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
    const KEYS_TO_FILTER = ['name', 'car_Type', 'fuel_Type', 'transmission', 'location']
    let temp = this.props.carDetails.filter(
      car => car.location === this.props.location
    );
    temp.forEach(car => {
      car.isAvailable = this.availabilityCheck(
        this.props.date,
        car.availability
      );
    });

    if (this.state.carType !== "Any") {
      temp = temp.filter(car => car.car_Type === this.state.carType);
    }
    if (this.state.fuelType !== "Any") {
      temp = temp.filter(car => car.fuel_Type === this.state.fuelType);
    }
    if (this.state.transmission !== "Any") {
      temp = temp.filter(car => car.transmission === this.state.transmission);
    }
    this.sortCarsByPrice(temp, this.state.priceOrder)
    this.sortAvailability(temp); //To show available cars first.
    if(this.state.searchTerm !== ""){
    temp = temp.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER));
    }
    this.setState(
      {
        filteredCars: temp
      }
    );
  };

  sortCarsByPrice = (temp, order) => {
      if(order === "Low To High"){
          temp.sort((a,b) => {
              if(a.price > b.price) return 1
              if(a.proce < b.price) return -1
          })
      }
      if(order === "High To Low"){
          temp.sort((a, b) => {
            if (a.price > b.price) return -1
            if (a.price < b.price) return 1
          })
      }
  }

  sortAvailability = temp => {
    temp.sort((a, b) => {
      if (a.isAvailable > b.isAvailable) return -1;
      if (b.isAvailable > a.isAvailable) return 1;
    });
  };

  render() {
    console.log(this.state);
    var defaultType = {
      key: "Any",
      text: "Any",
      value: "Any"
    };
    const carTypeOptions = [defaultType];
    const fuelTypeOptions = [defaultType];
    const transmissionOptions = [defaultType];
    const orderOptions = [{
        key: "Low To High",
        text: "Low To High",
        value: "Low To High"
    }, {
        key: "High To Low",
        text: "High To Low",
        value: "High To Low"
    }]
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
              <Form.Group widths="equal">
                <Form.Field
                  name="priceOrder"
                  control={Select}
                  options={orderOptions}
                  label={{
                    children: "Order By Price",
                    htmlFor: "form-select-control-gender"
                  }}
                  defaultValue={this.state.priceOrder}
                  onChange={this.handleChange}
                />
                <Form.Field>
                    <label> Search </label>
                    <SearchInput placeholder="Search using keywords. (Ex: SUV, Mahindra)" onChange={this.searchUpdated} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </div>
        <div style={{ margin: "auto" }}>
          {this.state.filteredCars.length !== 0 ? (
            <div>
              {this.state.filteredCars.map(carItemDetail => (
                <CustomCard
                  carItemDetail={carItemDetail}
                  landing={false}
                  carDetails={this.props.carDetails}
                />
              ))}
            </div>
          ) : (
            <div align="center" style = {{ marginTop: "50px"}}>
            <Card>
            <Image
              src="http://www.newdesignfile.com/postpic/2014/04/black-and-white-cartoon-car_36063.jpg"
              wrapped
              ui={false}
              size="medium"
            />
            <Card.Content>
              Sorry! There are no cars available for this filter. :(
            </Card.Content>
          </Card>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CarStatus;
