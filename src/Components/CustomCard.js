import React from "react";
import CustomForm from "./CustomForm";
import { Card, Image, Icon } from "semantic-ui-react";

function CustomCard(props) {
  return (
    <div>
      {props.landing ? (
        <div align="center" style={{ marginTop: "50px" }}>
          <Card>
            <Image
              src="https://cdn.pixabay.com/photo/2018/12/01/14/18/car-3849577__340.png"
              wrapped
              ui={false}
              size="medium"
            />
            <Card.Content>
              <CustomForm
                carDetails={props.carDetails}
                landing={props.landing}
              />
            </Card.Content>
            <Card.Content extra>
              <p>All Rights Reserved</p>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <div style={{ margin: "30px 10px 30px 10px", float: "left" }} >
          <Card>
            <Image
              src={props.carItemDetail.photo}
              wrapped
              ui={false}
              size="medium"
            />
            <Card.Content>
            <Card.Header><div align="center">{props.carItemDetail.name}</div></Card.Header>
              <Card.Description>
                <div style = {{ display: "flex", margin: "0px auto"}}>
                <div style= {{margin: "auto" }}>
                  <p>
                  <Icon name="location arrow" />
                  {props.carItemDetail.location}
                  </p>
                  <p>
                  <Icon name="dollar sign" />
                  {props.carItemDetail.price}
                  </p>
                  <p>
                  <Icon name="car" />
                  {props.carItemDetail.car_Type}
                  </p>
                </div>
                <div style= {{margin: "auto" }}>
                  <p>
                  <Icon name="flask" />
                  {props.carItemDetail.fuel_Type}
                  </p>
                  <p>
                  <Icon name="cog" />
                  {props.carItemDetail.transmission}
                  </p>
                  <p>
                  <Icon name="users" />
                  {props.carItemDetail.seats}
                  </p>
                </div>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {props.carItemDetail.isAvailable ? <p align="center" style = {{ color: "green"}}>Available</p> : <p align="center" style={{color: "red"}}> Not Available </p>}
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CustomCard;
