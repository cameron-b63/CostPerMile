import React from 'react';
import ReactDOM from 'react-dom';



import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
function Loan(props) {
    return (
        <Form.Group>
            <Form.Label>
                d. How much do you pay for loans per month for this car?
            </Form.Label>
            <Form.Control
                placeholder="Enter your monthly loan cost"
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


export default Loan;