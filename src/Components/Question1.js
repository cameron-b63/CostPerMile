import React from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function Question1(props){
    return(
    <Form.Group>
        <Form.Label>
            1. Enter your VIN(Vehicle Identification Number) here
        </Form.Label>
        <Form.Control
            placeholder="VIN (Optional) "
            onChange={props.onChange}
            id="VIN"
            type="text"
            name="VIN"
            value={props.state.VIN}
            
        />
        <Form.Text>
            Enter your VIN information to automatically answer the
            following questions or skip and answer questions manually.
        </Form.Text>
        {props.carMakeAlert}
        <Button
            onClick={props.onClick}
        >
            Submit your VIN to get official data from the NHTSA
        </Button>

    </Form.Group>
    );
}
export default Question1;