import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function NowCost(props) {
    return (
        <Form.Group>
            <Form.Label>
                b. How much is your car worth now?
            </Form.Label>
            <div><a style={{display: "table-cell"}} href="https://www.carfax.com/value/" target="_blank">Click here to get your Current Car Value from Car Fax!</a></div>
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
export default NowCost;