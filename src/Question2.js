import React from 'react';
import './index.css';
import './carmakes.json'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function Question2(props) {
    return (
        <Form.Row>

            <Form.Group>
                <Form.Label>
                    Year
                </Form.Label>

                <Form.Control
                    onChange={props._handleChange}
                    id="carYear"
                    name="carYear"
                    value={props._state.carYear}
                    required
                    as="select"
                >
                    <option></option>
                    {props._carYears}

                </Form.Control>

            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Make
                </Form.Label>
                <Form.Control as="select"
                    placeholder="Enter your car make"
                    onChange={props._handleChange}
                    id="carMake"
                    type="text"
                    name="carMake"
                    value={props._state.carMake}
                    required
                >
                    <option></option>

                    {props._allOptions}

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Model
                </Form.Label>
                <Form.Control
                    as="select"
                    required
                    onChange={props._handleChange}
                    id="carModel"
                    name="carModel"
                    value={props._state.carModel}

                >
                    <option></option>
                    {props._allOptions2}
                </Form.Control>
            </Form.Group>

        </Form.Row>
    );
}
export default Question2