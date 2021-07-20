import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';

function Question7(props) {
    return (

        <Form.Group>

            <Form.Label>
                7. How many miles do you usually drive per week?
            </Form.Label>
            <Form.Control type="text"
                placeholder="Enter how many miles driven"
                onChange={props._handleChange}
                id="miles"
                type="text"
                name="miles"
                value={props._state.miles}
                required
            />
            <Form.Text className="text-muted">Average in the US is 187 miles</Form.Text>

            {props._state.miles && !Number.isNaN(props._state.miles) ?
                (<Alert variant="secondary">
                    <Alert.Heading>Miles Per Year</Alert.Heading>
                    <p>That's {parseInt(props._state.miles) * 52} miles a year</p>
                </Alert>)
                :
                (<div></div>)
            }
        </Form.Group>


    );
}
export default Question7;