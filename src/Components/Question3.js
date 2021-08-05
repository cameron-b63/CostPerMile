import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

/**
 * function that returns an object representing question3
 * @param {object} props properties of component
 * @returns {object} Question3 component
 */
function Question3(props) {
    return (
        <Form.Group>
            <Form.Label>
                3. Are you an electric vehicle user or gas car user?
            </Form.Label>
            <Form.Control as="select"

                onChange={props._handleChange}
                id="isElectric"
                type="text"
                name="isElectric"
                value={props._state.isElectric}
                required
            >
                <option name="isElectric"></option>
                <option name="isElectric">gas</option>
                <option name="isElectric">electric</option>
            </Form.Control>
        </Form.Group>
    )

}
export default Question3;