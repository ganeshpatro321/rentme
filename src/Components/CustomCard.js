import React from 'react'
import CustomForm from './CustomForm';
import { Card, Image } from 'semantic-ui-react'

function CustomCard(props){
  
    return(
      <div>
        { props.landing ? 
        <div align = "center" style = {{ "marginTop" : "50px"}}>
        <Card>
        <Image src='https://cdn.pixabay.com/photo/2018/12/01/14/18/car-3849577__340.png' wrapped ui={false} size='medium' />
        <Card.Content>
          <CustomForm carDetails = {props.carDetails} />
        </Card.Content>
        <Card.Content extra>
          <p>
            All Rights Reserved
          </p>
        </Card.Content>
      </Card>
      </div> : <div>NAHHHH</div>
        }
      </div> 
    )
  }


export default CustomCard
