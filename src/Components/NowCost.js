import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function NowCost(props) {
    let displayCarFax;
    let displayButton;
    if(props._state.CarFax){
        displayCarFax = (
            <iframe src="https://www.carfax.com/value/" height = "300px" width = "100%"></iframe>
        )
        displayButton = "Close"
    }else{
        displayCarFax = (<div></div>)
        displayButton = "Click here to check Car Fax for your Car's worth!"
    }
    return (
        <Form.Group>
            <Form.Label>
                b. How much is your car worth now?
            </Form.Label>
            <br/>
            <Button onClick = {props._handleClickCarFax}>{displayButton}</Button>
            {displayCarFax}
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