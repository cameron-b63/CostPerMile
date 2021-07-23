import React from 'react';
import ReactDOM from 'react-dom';



import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
function Rental(props) {
    return (
        <Form.Group>
            <Form.Label>
                a. How much do you pay for rental/lease bills per month for this car?
            </Form.Label>
            <Form.Control
                placeholder="Enter monthly rental bill cost"
                onChange={props._handleChange}
                id="monthlyCarPay"
                type="text"
                name="monthlyCarPay"
                value={props._state.monthlyCarPay}
                required
            />

        </Form.Group>
    )
}


export default Rental;