import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function Question7(props) {
    return (
        <Form.Group>
            <Form.Label>
                7. What is your annual repair and maintenance cost?
            </Form.Label>
            <Form.Control
                placeholder="Enter how much you pay for maintenance a year"
                onChange={props._handleChange}
                id="maitenance"
                type="text"
                name="mait"
                value={props._state.mait}
                required
            />
        </Form.Group>
    )
}
export default Question7;