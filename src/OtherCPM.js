import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'

import defaultImage from './Components/Images/default(1).png'
import Bravo from './Components/Images/Bravo.png'
import Alpha from './Components/Images/Alpha.png'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col'
/**
 * 
 * @param {string} stringDisplay what to display on the table
 * @param {number} CPM Cost Per Mile of the User
 * @param {object} state state of the Calculator
 * @param {string} displayImage reference to the displayImage
 * @returns {object} returns each list element
 */
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
/**
 * 
 * @param {object} state state of calculator
 * @returns {object} Table to be shown on the phone (based on width of screen)
 */
function printArrayPhone(state){
    var imageDefault = state.otherFamousCars.filter((x) => x.Name.toLowerCase() === (state.carMake + " "+ state.carModel).toLowerCase());

    var arr = [
        [
            "Year",
            state.carYear,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Year : console.log(),
        ],
        [
            "Make",
            state.carMake,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Make : console.log(),

        ],

        [
            "Model",
            state.carModel,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Model : console.log(),

        ],
        [
            "Name",
            "YOUR CAR",
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name : console.log(),
        ],
        [
            "Image",
            <Image src = { typeof imageDefault[0] !== "undefined" && (parseFloat(state.carYear) > 2016) ?imageDefault[0].Image :defaultImage} className = "CarImagePhone"/>,
            (state.seeOtherCPM.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image === "None"? ((state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name ==="Indigo Alpha"? Alpha:Bravo)):state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image} className="CarImagePhone" /> : <div></div>),


        ],
        [
            "Cost Per Mile",
            state.costpermile.toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].CPM : console.log(),

        ],
        [
            "Depreciation",
            (state.depreciationValue / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].depreciation : console.log(),

        ],
        [
            "Fuel",
            Number.isNaN((((parseFloat(state.miles) * 52) / parseFloat(state.mpg)) * parseFloat(state.gallon)) / (parseFloat(state.miles) * 52)) ? ((((parseFloat(state.miles) * 52) / parseFloat(state.fullcharge)) * parseFloat(state.fullchargeCost)) / (parseFloat(state.miles) * 52)).toFixed(2) : ((((parseFloat(state.miles) * 52) / parseFloat(state.mpg)) * parseFloat(state.gallon)) / (parseFloat(state.miles) * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].fuel : console.log(),

        ],
        [
            "Insurance",
            ((state.iPaid) / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].insurance : console.log(),

        ],
        [
            "Maintenance/ Repairs",
            (state.mait / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].maintenance : console.log(),
        ],
        [
            "Other Costs",
            (((parseFloat(state.tolls)  * 12 )+ (parseFloat(state.monthlyCarPay) * 12) + parseFloat(state.licensePlate)) / ((parseFloat(state.miles)) * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].other : console.log(),
        ]
    ]
    console.log(arr);
    //let arr0 = arr[0][1];
    let Information0 = arr[0].map((element) => <th>{element}</th>)
    let Information1 = arr[1].map((element) => <th>{element}</th>)

    let Information2 = arr[2].map((element) => <th>{element}</th>)
    let Information3 = arr[3].map((element) => <th>{element}</th>)
    let Information4 = arr[4].map((element) => <th>{element}</th>)
    let Information5 = arr[5].map((element) => <th>{element}</th>)
    let Information6 = arr[6].map((element) => <th>{element}</th>)
    let Information7 = arr[7].map((element) => <th>{element}</th>)
    let Information8 = arr[8].map((element) => <th>{element}</th>)
    let Information9 = arr[9].map((element) => <th>{element}</th>)
    let Information10 = arr[10].map((element) => <th>{element}</th>)







    return (
        <tbody>
            <tr>{Information0}</tr>
            <tr>{Information1}</tr>
            <tr>{Information2}</tr>
            <tr>{Information3}</tr>
            <tr>{Information4}</tr>
            <tr>{Information5}</tr>
            <tr>{Information6}</tr>
            <tr>{Information7}</tr>
            <tr>{Information8}</tr>
            <tr>{Information9}</tr>
            <tr>{Information10}</tr>


        </tbody>
    )
}
/**
 * 
 * @param {object} state state of Calculator
 * @returns {object} Table of information 
 */
function printArrayOfInformation(state) {
    var imageDefault = state.otherFamousCars.filter((x) => x.Name.toLowerCase() === (state.carMake + " "+ state.carModel).toLowerCase());
    var arr = [
        [
            "Year",
            state.carYear,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Year : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Year : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Year : console.log()
        ],
        [
            "Make",
            state.carMake,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Make : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Make : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Make : console.log()

        ],

        [
            "Model",
            state.carModel,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Model : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Model : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Model : console.log()

        ],
        [
            "Name",
            "YOUR CAR",
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Name : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Name : console.log()
        ],
        [
            "Image",
            <Image src = { typeof imageDefault[0] !== "undefined" && (parseFloat(state.carYear) > 2016) ?imageDefault[0].Image :defaultImage} className = "CarImage"/>,
            (state.seeOtherCPM.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image === "None"? ((state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name ==="Indigo Alpha"? Alpha:Bravo)):state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image} className="CarImage" /> : <div></div>),
            (state.seeOtherCPM2.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Image === "None"? ((state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Name ==="Indigo Alpha"? Alpha:Bravo)):state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Image} className="CarImage" /> : <div></div>),
            (state.seeOtherCPM3.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Image === "None"? ((state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Name ==="Indigo Alpha"? Alpha:Bravo)):state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Image} className="CarImage" /> : <div></div>),


        ],
        [
            "Cost Per Mile",
            state.costpermile.toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].CPM : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].CPM : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].CPM : console.log()

        ],
        [
            "Depreciation",
            (state.depreciationValue / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].depreciation : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].depreciation : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].depreciation : console.log()

        ],
        [
            "Fuel",
            Number.isNaN((((parseFloat(state.miles) * 52) / parseFloat(state.mpg)) * parseFloat(state.gallon)) / (parseFloat(state.miles) * 52)) ? ((((parseFloat(state.miles) * 52) / parseFloat(state.fullcharge)) * parseFloat(state.fullchargeCost)) / (parseFloat(state.miles) * 52)).toFixed(2) : ((((parseFloat(state.miles) * 52) / parseFloat(state.mpg)) * parseFloat(state.gallon)) / (parseFloat(state.miles) * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].fuel : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].fuel : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].fuel : console.log()

        ],
        [
            "Insurance",
            ((state.iPaid) / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].insurance : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].insurance : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].insurance : console.log()

        ],
        [
            "Maintenance/Repairs",
            (state.mait / (state.miles * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].maintenance : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].maintenance : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].maintenance : console.log()
        ],
        [
            "Other Costs ",
            (((parseFloat(state.tolls) * 12) + (parseFloat(state.monthlyCarPay) * 12)) / ((parseFloat(state.miles)) * 52)).toFixed(2),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].other : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].other : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].other : console.log()
        ]
    ]
    //let arr0 = arr[0][1];
    let Information0 = arr[0].map((element) => <th>{element}</th>)
    let Information1 = arr[1].map((element) => <th>{element}</th>)

    let Information2 = arr[2].map((element) => <th>{element}</th>)
    let Information3 = arr[3].map((element) => <th>{element}</th>)
    let Information4 = arr[4].map((element) => <th>{element}</th>)
    let Information5 = arr[5].map((element) => <th>{element}</th>)
    let Information6 = arr[6].map((element) => <th>{element}</th>)
    let Information7 = arr[7].map((element) => <th>{element}</th>)
    let Information8 = arr[8].map((element) => <th>{element}</th>)
    let Information9 = arr[9].map((element) => <th>{element}</th>)
    let Information10 = arr[10].map((element) => <th>{element}</th>)







    return (
        <tbody>
            <tr>{Information0}</tr>
            <tr>{Information1}</tr>
            <tr>{Information2}</tr>
            <tr>{Information3}</tr>
            <tr>{Information4}</tr>
            <tr>{Information5}</tr>
            <tr>{Information6}</tr>
            <tr>{Information7}</tr>
            <tr>{Information8}</tr>
            <tr>{Information9}</tr>
            <tr>{Information10}</tr>


        </tbody>
    )
}
/**
 * 
 * @param {object} state state of calculator
 * @returns {object} Returns ENTIRE TABLE pulling things returned by printArrayOfInformation() 
 */
function OtherCPM(state) {

    var otherCPM;
    if (state.width > 800) {
        otherCPM = (
            <Table striped bordered hover className="CarTable">
                <thead>
                    <tr>

                        <th>Quantity of Information</th>
                        <th>Your Car</th>
                        <th>Car 1</th>
                        <th>Car 2</th>
                        <th>Car 3</th>
                    </tr>
                </thead>


                {printArrayOfInformation(state)}
            </Table>)
    }
    else {
        otherCPM = (
            <div className = "Slim">
                <Table striped bordered hover className="CarTable" >
                    <thead>
                        <tr>

                            <th>Quantity of Information</th>
                            <th>Your Car</th>
                            <th>Car 1</th>
                            
                            
                        </tr>
                    </thead>


                    {printArrayPhone(state)}
                </Table>
            </div>
        );
    }
    return otherCPM;
}

export default OtherCPM;