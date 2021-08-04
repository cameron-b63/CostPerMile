import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
/**
 * 
 * @param {object} props properties of component
 * @returns {object} Question4 component
 */
function Question4(props) {
    return (
        <Form.Group>
            <Form.Label>
                4. Is the car you own bought or are you renting/leasing it?
            </Form.Label>
            <Form.Control as="select"

                onChange={props._handleChange}
                id="isRental"
                type="text"
                name="isRental"
                value={props._state.isRental}
                required
            >
                <option name="isRental"></option>
                <option name="isRental">rental/lease</option>
                <option name="isRental">bought</option>
            </Form.Control>
        </Form.Group>
    )

}
export default Question4;