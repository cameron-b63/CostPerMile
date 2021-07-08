import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function Question9(props) {
    return (
        <Form.Group>
            <Form.Label>
                9.  Any other annual car related costs? (e.g. parking, tolls, washing etc.)
            </Form.Label>
            <Form.Control
                placeholder="Enter how much you pay for tolls"
                onChange={props._handleChange}
                id="tolls"
                type="text"
                name="tolls"
                value={props._state.tolls}
                required
            />

        </Form.Group>)
    
}
export default Question9;