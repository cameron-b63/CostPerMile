import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';
/**
 * 
 * @param {object} props properties of component
 * @returns {object} Question7
 */
function Quesiton7(props) {
    return (
        <Form.Group>
            <Form.Label>
                7. What is your annual repair and maintenance cost for this car?
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
            <Form.Text className="text-muted">Average in the US is $792</Form.Text>

        </Form.Group>
    )

}
export default Quesiton7;