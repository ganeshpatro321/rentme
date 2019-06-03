import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./Components/Home";
import CarStatus from "./Components/CarStatus";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {
      carDetails: []
    };
  }

  fetcCarDetails = async () => {
    await fetch("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
      .then(res => res.json())
      .then(res => {
        this.setState({
          carDetails: res
        });
      });
  };

  componentDidMount() {
    this.fetcCarDetails();
  }

  render() {
    if(this.state.carDetails.length !== 0){
    return (
    <BrowserRouter>
      <Switch>
       <Route exact path="/" render={ () => {
         return <Home carDetails={this.state.carDetails} />
       }
       } />
       <Route path="/car/:location/:date" render={ ({match}) => {
         return <CarStatus {...match.params} carDetails={this.state.carDetails}/>
       }} />
      </Switch>
    </BrowserRouter>
    );
    } else {
    return <div> Loading.. </div>
    }
  }
}

export default App;
