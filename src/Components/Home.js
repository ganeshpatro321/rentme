import React from 'react';
import CustomCard from './CustomCard';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carDetails : []
        }
    }

    componentDidMount = () => {
        if(this.props.carDetails){
            this.setState({
                carDetails: this.props.carDetails
            })
        } 
    }

    render(){
        return(
            <CustomCard carDetails={this.state.carDetails} landing={true}/>
        )
    }
}