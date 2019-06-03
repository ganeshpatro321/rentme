import React from "react";
import CustomForm from "./CustomForm";
import CustomCard from "./CustomCard";

class CarStatus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            carDetails: [],
            filteredCars: []
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.carDetails){
            this.setState({
                carDetails: this.props.carDetails
            })
        }
    }

    render(){
    return(
        <div>
        <div style = {{ width: "800px", margin: "auto", marginTop: "50px"}}>
            <CustomForm landing={false} carDetails={this.props.carDetails}/>
        </div>
        <div style = {{margin: "auto"}}>
            {this.props.carDetails.map((carItemDetail) => (
                <CustomCard carItemDetail={carItemDetail} landing={false} carDetails={this.props.carDetails}/>
            ))}
        </div>
        </div>
    );
    }
}

export default CarStatus;