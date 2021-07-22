import React from 'react';
import ReactDOM from 'react-dom';



import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
function NewCost(stateProps) {
    return (
        <Form.Group>
            <Form.Label>
                a. How much was this car when you first bought it?
            </Form.Label>
            <Form.Control
                placeholder="Enter your original price"
                onChange={stateProps.onChange}
                id="originalPrice"
                type="text"
                name="originalPrice"
                value={stateProps.state.originalPrice}
                required
            />

        </Form.Group>
    )
}


export default NewCost;