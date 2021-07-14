import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'


import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function renderListElement(stringDisplay, CPM, state, displayImage) {
    if (typeof displayImage !== "undefined") {
        return (
            <tr>
                <td>{stringDisplay}</td>
                <td>{CPM}</td>
                <td>{(CPM - state.costpermile.toFixed(2)) > 0 ? "+" + ((CPM - state.costpermile.toFixed(2)).toFixed(2)) : (CPM - state.costpermile.toFixed(2)).toFixed(2)}</td>
                <td><Image src={displayImage} fluid /></td>
            </tr>
        );
    }
    else {
        return (
            <tr>
                <td>{stringDisplay}</td>
                <td>{CPM}</td>
                <td>{(CPM - state.costpermile.toFixed(2)) > 0 ? "+" + ((CPM - state.costpermile.toFixed(2)).toFixed(2)) : (CPM - state.costpermile.toFixed(2)).toFixed(2)}</td>
            </tr>
        )
    }
}
function OtherCPM(state) {

    var otherCPM;
    otherCPM = (
        <Table striped bordered hover className = "CarTable">
            <thead>
                <tr>
                    
                    <th>Year of Car</th>
                    <th>Make of Car</th>
                    <th>Model of Car</th>
                    <th>Name of Car</th>
                    <th>Image of Car</th>
                    <th>Cost Per mile</th>
                    <th>Depreciation</th>
                    <th>Fuel</th>
                    <th>Insurance</th>
                    <th>Maintenance /Repairs</th>
                    <th>Other costs</th>

                </tr>
            </thead>
            <tbody>

                <tr>
                    
                    <th>{state.carYear}</th>
                    <th>{state.carMake}</th>
                    <th>{state.carModel}</th>
                    <th>{"YOUR CAR"}</th>
                    <th></th>
                    <th>{state.costpermile.toFixed(3)}</th>
                    <th>{(state.depreciationValue / (state.miles * 52)).toFixed(3)}</th>
                    <th>{   Number.isNaN((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52))? (  (((parseInt(state.miles) * 52) / parseInt(state.fullcharge)) * parseInt(state.fullchargeCost)) / (parseInt(state.miles) * 52)).toFixed(3): ((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52)).toFixed(3)  }</th>
                    <th>{((state.iPaid) / (state.miles* 52)).toFixed(3)}</th>
                    <th>{(state.mait / (state.miles * 52)).toFixed(3)}</th>
                    <th>{((parseInt(state.tolls) + parseInt(state.monthlyCarPay) + parseInt(state.licensePlate))/ ((parseInt(state.miles))* 52)).toFixed(3)}</th>
                </tr>
                <tr>
                    
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Year : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Make : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Model : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image}  fluid/>: <div></div> } </th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].CPM : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].depreciation : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].fuel : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].insurance : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].maintenance : console.log()}</th>
                    <th>{state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].other : console.log()}</th>
                </tr>
                <tr>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Year : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Make : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Model : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Name : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Image}  fluid />: <div></div> } </th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].CPM : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].depreciation : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].fuel : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].insurance : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].maintenance : console.log()}</th>
                    <th>{state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].other : console.log()}</th>


                </tr>
                <tr>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Year : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Make : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Model : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Name : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Image}  fluid />: <div></div> } </th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].CPM : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].depreciation : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].fuel : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].insurance : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].maintenance : console.log()}</th>
                    <th>{state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].other : console.log()}</th>


                </tr>

            </tbody>

        </Table>)
    return otherCPM;
}
/*function OtherCPM(state) {
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
*/
export default OtherCPM;