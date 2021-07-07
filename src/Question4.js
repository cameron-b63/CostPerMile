import React from 'react';
import ReactDOM from 'react-dom';



import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
import Calculator from './App.js'
function Question4(stateProps){
        return (
            <Form.Group>
                <Form.Label>
                    4. How much was this car when it was brand new?
                </Form.Label>
                <Form.Control
                    placeholder="Enter your original price"
                    onChange={stateProps.onChange} 
                    id="originalPrice"
                    type="text"
                    name="originalPrice"
                    value={stateProps.state.originalPrice}
                    required
                />

            </Form.Group>
        )
        }


export default Question4;