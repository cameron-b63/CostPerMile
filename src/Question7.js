import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
function Question7(props) {
    return (
        <Form.Group>
            <Form.Label>
                7. What is your annual license plate renewal fee?
            </Form.Label>
            <Form.Control
                required
                placeholder="Enter your annual cost to renew your license plate"
                onChange={props._handleChange}
                id="licenseRenewal"
                type="text"
                name="licensePlate"
                value={props._state.licensePlate}
            />
        </Form.Group>
    );
}
export default Question7;