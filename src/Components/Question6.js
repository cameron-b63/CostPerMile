import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
function Question6(props) {
    return (
        <Form.Group>
            <Form.Label>
                6. What is your annual insurance cost?
            </Form.Label>
            <Form.Control
                required
                placeholder="Enter the amount of insurance paid a year"
                onChange={props._handleChange}
                id="insurance"
                type="text"
                name="iPaid"
                value={props._state.iPaid}
            />
                    <Form.Text className="text-muted">Average in the US is $1674</Form.Text>


        </Form.Group>
    )
    
}
export default Question6;