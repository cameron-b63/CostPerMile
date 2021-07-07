import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function Question5(props) {
    return (
        <Form.Group>
            <Form.Label>
                5. How much is your car worth now?
            </Form.Label>
            <Form.Control
                placeholder="Enter the current price"
                onChange={props._handleChange}
                id="finalPrice"
                type="text"
                name="finalPrice"
                value={props._state.finalPrice}
                required
            />

        </Form.Group>
    )
}
export default Question5;