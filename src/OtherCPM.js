import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'


import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


function renderListElement(stringDisplay, CPM,state, displayImage) {
    if (typeof displayImage !== "undefined") {
        return (
            <tr>
                <td>{stringDisplay}</td>
                <td>{CPM}</td>
                <td>{(CPM - state.costpermile.toFixed(2)) > 0 ? "+" + (( CPM - state.costpermile.toFixed(2)).toFixed(2)) : ( CPM - state.costpermile.toFixed(2)).toFixed(2)}</td>
                <td><Image src={displayImage} fluid /></td>
            </tr>
        );
    }
    else {
        return (
            <tr>
                <td>{stringDisplay}</td>
                <td>{CPM}</td>
                <td>{(CPM - state.costpermile.toFixed(2)) > 0 ? "+" + (( CPM - state.costpermile.toFixed(2)).toFixed(2)) : ( CPM - state.costpermile.toFixed(2)).toFixed(2)}</td>
            </tr>
        )
    }
}
function OtherCPM(state) {
    let otherCPM;
    //conditional rendering of other Cost Per Miles
    if (state.seeOtherCPM.indexOf("10k") > 0) {
        otherCPM = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cost per mile of</th>
                        <th>Cost per mile ($)</th>
                        <th>Cost per mile in relation to You</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Cost Per Mile</td>
                        <td>{state.costpermile.toFixed(2)}</td>
                        <td>{(state.costpermile - state.costpermile).toFixed(2)}</td>
                    </tr>

                    {renderListElement("Average US Driver who drives 10k miles", 0.79, state)}
                    {renderListElement("Average US Driver who drives a Small Sedan (10k miles)", 0.61, state)}
                    {renderListElement("Average US Driver who drives a Medium Sedan (10k miles)", 0.75, state)}
                    {renderListElement("Average US Driver who drives a Large Sedan (10k miles)", 0.90, state)}
                    {renderListElement("Average US Driver who drives a Small SUV (10k miles)", 0.71, state)}
                    {renderListElement("Average US Driver who drives a Medium SUV (10k miles)", 0.87, state)}
                    {renderListElement("Average US Driver who drives a Minivan (10k miles)", 0.87, state)}
                    {renderListElement("Average US Driver who drives a Hybrid Vehicle (10k miles)", 0.68, state)}
                    {renderListElement("Average US Driver who drives an Electric Vehicle (10k miles", 0.75, state)}
                </tbody>
            </Table>
        )

    }
    else if (state.seeOtherCPM.indexOf("15k") > 0) {
        otherCPM = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cost per mile of</th>
                        <th>Cost per mile ($)</th>
                        <th>Cost per mile in relation to You</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Cost Per Mile</td>
                        <td>{state.costpermile.toFixed(2)}</td>
                        <td>{(state.costpermile - state.costpermile).toFixed(2)}</td>
                    </tr>

                    {renderListElement("Average US Driver who drives 15k miles", 0.61,state)}
                    {renderListElement("Average US Driver who drives a Small Sedan (15k miles)", 0.47,state)}
                    {renderListElement("Average US Driver who drives a Medium Sedan (15k miles)", 0.58,state)}
                    {renderListElement("Average US Driver who drives a Large Sedan (15k miles)", 0.69,state)}
                    {renderListElement("Average US Driver who drives a Small SUV (15k miles)", 0.56,state)}
                    {renderListElement("Average US Driver who drives a Medium SUV (15k miles)", 0.68,state)}
                    {renderListElement("Average US Driver who drives a Minivan (15k miles)", 0.67,state)}
                    {renderListElement("Average US Driver who drives a Hybrid Vehicle (15k miles)", 0.52,state)}
                    {renderListElement("Average US Driver who drives an Electric Vehicle (15k miles", 0.55,state)}



                </tbody>
            </Table>
        )
    }
    else if (state.seeOtherCPM.indexOf("20k") > 0) {
        otherCPM = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cost per mile of</th>
                        <th>Cost per mile ($)</th>
                        <th>Cost per mile in relation to You</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Cost Per Mile</td>
                        <td>{state.costpermile.toFixed(2)}</td>
                        <td>{(state.costpermile - state.costpermile).toFixed(2)}</td>
                    </tr>


                    {renderListElement("Average US Driver who drives 20k miles", 0.53,state)}
                    {renderListElement("Average US Driver who drives a Small Sedan (20k miles)", 0.41,state)}
                    {renderListElement("Average US Driver who drives a Medium Sedan (20k miles)", 0.49,state)}
                    {renderListElement("Average US Driver who drives a Large Sedan (20k miles)", 0.59,state)}
                    {renderListElement("Average US Driver who drives a Small SUV (20k miles)", 0.48,state)}
                    {renderListElement("Average US Driver who drives a Medium SUV (20k miles)", 0.59,state)}
                    {renderListElement("Average US Driver who drives a Minivan (20k miles)", 0.57,state)}
                    {renderListElement("Average US Driver who drives a Hybrid Vehicle (20k miles)", 0.43,state)}
                    {renderListElement("Average US Driver who drives an Electric Vehicle (20k miles", 0.46,state)}
                </tbody>
            </Table>


        )
    }
    else if (state.seeOtherCPM.indexOf("Other") > 0) {
        var renderTable = state.otherFamousCars.map((N) => renderListElement("Average US Driver who drives a " + N.Name, N.CPM,state, N.Image))
        otherCPM = (
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Cost per mile of</th>
                        <th>Cost per mile ($)</th>
                        <th>Cost per mile in relation to You</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Cost Per Mile</td>
                        <td>{state.costpermile.toFixed(2)}</td>
                        <td>{(state.costpermile - state.costpermile).toFixed(2)}</td>
                    </tr>
                    {renderTable}


                </tbody>
            </Table>);



    }
    else {
        otherCPM = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cost per mile of</th>
                        <th>Cost per mile ($)</th>
                        <th>Cost per mile in relation to You</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Cost Per Mile</td>
                        <td>{state.costpermile.toFixed(2)}</td>
                        <td>{(state.costpermile - state.costpermile).toFixed(2)}</td>
                    </tr>

                    {renderListElement("Average US Driver who drives 10k miles", 0.79,state)}
                    {renderListElement("Average US Driver who drives 15k miles", 0.61,state)}
                    {renderListElement("Average US Driver who drives 20k miles", 0.53,state)}
                </tbody>
            </Table>
        )
    }
    
   
    return (
        otherCPM
    )
}
export default OtherCPM;