import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'


import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col'

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
function printArrayPhone(state){
    var arr = [
        [
            "Year of Car",
            state.carYear,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Year : console.log(),
        ],
        [
            "Make of Car",
            state.carMake,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Make : console.log(),

        ],

        [
            "Model of Car",
            state.carModel,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Model : console.log(),

        ],
        [
            "Name of Car",
            "YOUR CAR",
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name : console.log(),
        ],
        [
            "Image of Car",
            <Image src = {"https://pic.onlinewebfonts.com/svg/img_10593.png"} className = "CarImagePhone"/>,
            (state.seeOtherCPM.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image} className="CarImagePhone" /> : <div></div>),


        ],
        [
            "Cost Per mile",
            state.costpermile.toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].CPM : console.log(),

        ],
        [
            "Depreciation",
            (state.depreciationValue / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].depreciation : console.log(),

        ],
        [
            "Fuel",
            Number.isNaN((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52)) ? ((((parseInt(state.miles) * 52) / parseInt(state.fullcharge)) * parseInt(state.fullchargeCost)) / (parseInt(state.miles) * 52)).toFixed(3) : ((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].fuel : console.log(),

        ],
        [
            "Insurance",
            ((state.iPaid) / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].insurance : console.log(),

        ],
        [
            "Maintenance /Repairs",
            (state.mait / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].maintenance : console.log(),
        ],
        [
            "Other costs ",
            ((parseInt(state.tolls) + (parseInt(state.monthlyCarPay) * 12) + parseInt(state.licensePlate)) / ((parseInt(state.miles)) * 52)).toFixed(3),
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
function printArrayOfInformation(state) {
    var arr = [
        [
            "Year of Car",
            state.carYear,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Year : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Year : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Year : console.log()
        ],
        [
            "Make of Car",
            state.carMake,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Make : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Make : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Make : console.log()

        ],

        [
            "Model of Car",
            state.carModel,
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Model : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Model : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Model : console.log()

        ],
        [
            "Name of Car",
            "YOUR CAR",
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Name : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Name : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Name : console.log()
        ],
        [
            "Image of Car",
            <Image src = {"https://pic.onlinewebfonts.com/svg/img_10593.png"} className = "CarImage"/>,
            (state.seeOtherCPM.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].Image} className="CarImage" /> : <div></div>),
            (state.seeOtherCPM2.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].Image} className="CarImage" /> : <div></div>),
            (state.seeOtherCPM3.length > 0 ? <Image src={state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].Image} className="CarImage" /> : <div></div>)


        ],
        [
            "Cost Per mile",
            state.costpermile.toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].CPM : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].CPM : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].CPM : console.log()

        ],
        [
            "Depreciation",
            (state.depreciationValue / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].depreciation : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].depreciation : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].depreciation : console.log()

        ],
        [
            "Fuel",
            Number.isNaN((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52)) ? ((((parseInt(state.miles) * 52) / parseInt(state.fullcharge)) * parseInt(state.fullchargeCost)) / (parseInt(state.miles) * 52)).toFixed(3) : ((((parseInt(state.miles) * 52) / parseInt(state.mpg)) * parseInt(state.gallon)) / (parseInt(state.miles) * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].fuel : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].fuel : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].fuel : console.log()

        ],
        [
            "Insurance",
            ((state.iPaid) / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].insurance : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].insurance : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].insurance : console.log()

        ],
        [
            "Maintenance /Repairs",
            (state.mait / (state.miles * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].maintenance : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].maintenance : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].maintenance : console.log()
        ],
        [
            "Other costs ",
            ((parseInt(state.tolls) + (parseInt(state.monthlyCarPay) * 12) + parseInt(state.licensePlate)) / ((parseInt(state.miles)) * 52)).toFixed(3),
            state.seeOtherCPM.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM)[0].other : console.log(),
            state.seeOtherCPM2.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM2)[0].other : console.log(),
            state.seeOtherCPM3.length > 0 ? state.otherFamousCars.filter((x) => x.Name === state.seeOtherCPM3)[0].other : console.log()
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