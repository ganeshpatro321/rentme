import React from "react";
import CustomForm from "./CustomForm";
import CustomCard from "./CustomCard";
import moment from 'moment';

class CarStatus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            carDetails: [],
            filteredCars: []
        }
    }

    componentDidMount(){
        if(this.props.carDetails){
            this.setState({
                carDetails: this.props.carDetails,
                location: this.props.location,
                date: this.props.date
            }, () => {
                this.getAvailableCars(); 
            })
        }
        
    }

    availabilityCheck = (date, availability) => {
        date = moment(date, 'YYYY-MM-DD');
        availability = availability.split(/[ ,]+/)
        let day = date.format('ddd');
        console.log(day)
        if(availability.indexOf(day) > -1){
            return true
        }
        return false
    }

    getAvailableCars = () => {
        console.log(this.state.carDetails)
        const temp = this.state.carDetails.filter(
            car => car.location === this.state.location
        )
        
        temp.forEach(car => {
            car.isAvailable = this.availabilityCheck(this.state.date, car.availability)
        })
        console.log(temp);
        this.setState({
            filteredCars: temp
        })
    }   



    render(){
    console.log(this.state)
    return(
        <div>
        <div style = {{ width: "800px", margin: "auto", marginTop: "50px"}}>
            <CustomForm landing={false} carDetails={this.props.carDetails} location={this.props.location} date={this.props.date}/>
        </div>
        <div style = {{margin: "auto"}}>
            {this.state.filteredCars.map((carItemDetail) => (
                <CustomCard carItemDetail={carItemDetail} landing={false} carDetails={this.props.carDetails}/>
            ))}
        </div>
        </div>
    );
    }
}

export default CarStatus;