import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costpermile: 2,
            iPaid: "",
            miles: "",
            mait: "",
            api: [],
            models: [],
            originalPrice: "",
            finalPrice: "",
            tolls: "",
            statecode: "",
            mpg: "",
            subscriptions: "",
            gallon: "",
            typeOfGas: "gasoline",
            priceOfGas: "",
            city: "",
            VIN: "",
            VINAPI: "",
            depreciationValue: "",
            fullcharge: "",
            fullchargeCost: "",
            zipcode: "",
            carMake: "",
            carModel: "",
            isElectric: "",
            carYear: "",
            carBasePrice: "",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCarMake = this.handleCarMake.bind(this);


    }

    depreciate() {

        let depreciation = (parseInt(this.state.originalPrice) - parseInt(this.state.finalPrice)) / (2021 - parseInt(this.state.carYear));
        this.setState({ depreciationValue: depreciation });
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        });

        console.log(this.state);
    }
    handleClick(e) {
        this.getVIN(this.state.VIN);

    }
    handleCarMake() {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
            .then(response => response.json())
            .then(data => {
                this.setState({ api: data["Results"] })
                console.log(data["Results"])
                console.log(this.state.api);
            })

    }
    handleSubmit(e) {
        e.preventDefault();
        this.depreciate();
        this.getZIP(this.state.zipcode);

        if (this.state.mpg.length > 0) {
            this.getData(this.state.statecode);
        }


        let final;

        if (this.state.mpg.length > 0) {
            final = (parseInt(this.state.depreciationValue) +
                parseInt(this.state.iPaid) +
                (((this.state.miles * 52) / this.state.mpg) * this.state.gallon) +
                parseInt(this.state.mait) +
                (parseInt(this.state.tolls) * 12) +
                parseInt(this.state.subscriptions))
                / (parseInt(this.state.miles) * 52);
        } else {
            final = (parseInt(this.state.depreciationValue) +
                parseInt(this.state.iPaid) +
                ((parseInt(this.state.miles) / parseInt(this.state.fullcharge)) * parseInt(this.state.fullchargeCost)) +
                parseInt(this.state.mait) +
                (parseInt(this.state.tolls) * 12) +
                parseInt(this.state.subscriptions)) /
                (parseInt(this.state.miles) * 52);

        }

        this.setState(
            {
                costpermile: final
            })
    }
    getVIN(vin) {
        var make;
        var model;
        var modelYear;
        var basePrice;
        var fuelType;
        if (vin.length > 0) {
            fetch('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + this.state.VIN + '?format=json&modelyear=')
                .then(response => response.json())
                .then(data => {
                    this.setState({ VINAPI: data["Results"] });

                    if (this.state.VINAPI.length > 0) {
                        make = this.state.VINAPI.filter((x) => x.Variable === "Make")[0].Value;
                        model = this.state.VINAPI.filter((x) => x.Variable === "Model")[0].Value;
                        modelYear = this.state.VINAPI.filter((x) => x.Variable === "Model Year")[0].Value;
                        basePrice = this.state.VINAPI.filter((x) => x.Variable === "Base Price ($)")[0].Value;
                        fuelType = this.state.VINAPI.filter((x) => x.Variable === "Fuel Type - Primary")[0].Value;
                        if (make === null || make === "Not Applicable") {
                            console.log("make is null");
                        }
                        if (model === null || make === "Not Applicable") {
                            console.log("model is null");
                        }
                        if (modelYear === null || make === "Not Applicable") {
                            console.log("modelYear is null");
                        }
                        if (basePrice === null || make === "Not Applicable") {
                            console.log("basePrice is null");
                        }
                        if (fuelType === null || make === "Not Applicable") {
                            console.log("fuelType is null");
                        }
                        if (fuelType !== null) {
                            if (fuelType.indexOf("as") > 0) {
                                fuelType = "gas"
                            } else {
                                fuelType = "electric"
                            }
                        } else {
                            fuelType = ""
                        }
                        this.setState({
                            carMake: make,
                            carModel: model,
                            carYear: modelYear,
                            carBasePrice: basePrice,
                            isElectric: fuelType
                        })
                        console.log(this.state);
                    }

                })

        }
    }

    getZIP(zip) {
        if (zip.length > 0) {

            /*var obj = {  
                method: 'GET',
                
                "port": null,
                "path": "/rest/info.json/" + this.state.zipcode + "/degrees",
                headers: {
                    "x-rapidapi-key": "73d45d6313mshd16f17ab16d3fe8p1368ecjsn7f132604eddb",
                    "x-rapidapi-host": "redline-redline-zipcode.p.rapidapi.com",
                    "useQueryString": true
                },
                
            };
            fetch('redline-redline-zipcode.p.rapidapi.com',obj)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.getData(this.state.statecode)
            })
            */



            const http = require("https");

            const options = {
                "method": "GET",
                "hostname": "redline-redline-zipcode.p.rapidapi.com",
                "port": null,
                "path": "/rest/info.json/" + this.state.zipcode + "/degrees",
                "headers": {
                    "x-rapidapi-key": "73d45d6313mshd16f17ab16d3fe8p1368ecjsn7f132604eddb",
                    "x-rapidapi-host": "redline-redline-zipcode.p.rapidapi.com",
                    "useQueryString": true
                }
            };
            var self = this;
            const req = http.request(options, function (res) {
                const chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    const body = Buffer.concat(chunks);

                    var bodyJSON = JSON.parse(body.toString());
                    console.log(bodyJSON);
                    self.setState({
                        statecode: bodyJSON.state,
                        city: bodyJSON.city,
                    })


                    self.getData(self.state.statecode);

                });
            });

            req.end();



        }
    }


    getData(state) {

        if (state.length > 0) {


            /*const options = {
                "method": "GET",
                
                "port": null,
                "path": "/gasPrice/stateUsaPrice?state=" + state.toUpperCase(),
                "headers": {
                    "content-type": "application/json",
                    "authorization": "apikey 49S3NpApsO1VH7MBkPuIdl:7czVHVdiBbrpo2bR2gV987"
                }
            }
            fetch("api.collectapi.com",options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.getData(this.state.statecode)
            })
            */


            var http = require("https");

            var options = {
                "method": "GET",
                "hostname": "api.collectapi.com",
                "port": null,
                "path": "/gasPrice/stateUsaPrice?state=" + state.toUpperCase(),
                "headers": {
                    "content-type": "application/json",
                    "authorization": "apikey 49S3NpApsO1VH7MBkPuIdl:7czVHVdiBbrpo2bR2gV987"
                }
            };
            var self = this;
            var req = http.request(options, function (res) {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    var bodyJSON = JSON.parse(body.toString());
                    console.log(bodyJSON);
                    console.log(self.state.typeOfGas);
                    var city = bodyJSON.result.cities.filter((x) => x.name.toLowerCase() === self.state.city.toLowerCase());
                    if (city.length > 0) {
                        console.log(city[0][self.state.typeOfGas]);
                        self.setState({
                            gallon: city[0][self.state.typeOfGas]
                        })
                    }

                });
            });

            req.end();


        }
    }
    render() {
        let allOptions;
        if (this.state.api.length < 5) {
            fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
                .then(response => response.json())
                .then(data => {
                    this.setState({ api: data["Results"] });

                })
        }
        allOptions = this.state.api.map((num) => <option>{num.Make_Name}</option>)
        let allOptions2;
        let renderCarModel;


        if (this.state.carMake.length > 0) {
            fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/' + this.state.carMake + '?format=json')
                .then(response => response.json())
                .then(data => {
                    this.setState({ models: data["Results"] });

                })

        }

        var years = [];
        for (var i = 0; i < 100; i++) {
            years.push(2021 - i);
        }
        const carYears = years.map((num) => <option>{num}</option>)
        allOptions2 = this.state.models.map((num) => <option>{num.Model_Name}</option>)
        if (this.state.carMake.length === 0) {
            renderCarModel = (<div></div>);
        }
        else {
            renderCarModel = (
                <div>
                    <Form.Group>
                        <Form.Label>
                            What is your car model?
                        </Form.Label>
                        <Form.Control
                            as="select"

                            onChange={this.handleChange}
                            id="carModel"
                            name="carModel"
                            value={this.state.carModel}
                        >
                            {allOptions2}
                        </Form.Control>
                    </Form.Group>
                </div>
            );

        }

        let renderThis;

        if (this.state.isElectric === null || this.state.isElectric.length === 0) {
            renderThis = (<div></div>);
        }
        else if (this.state.isElectric.indexOf("as") > 0) {
            renderThis = (<div><Form.Group>
                <Form.Label>
                    What fuel type do you use?
                </Form.Label>
                <Form.Control as="select"
                    onChange={this.handleChange}
                    id="typeOfGas"
                    type="text"
                    name="typeOfGas"
                    value={this.state.typeOfGas}
                >
                    <option name="typeOfGas"> gasoline</option>
                    <option name="typeOfGas">midGrade</option>
                    <option name="typeOfGas"> premium</option>
                    <option name="typeOfGas"> diesel</option>
                </Form.Control>
                <Form.Text>
                    Do not answer this question if you are an electric vehicle user
                </Form.Text>
            </Form.Group>


                <Form.Group>
                    <Form.Label>
                        What is your MPG(Miles Per Gallon)?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter your mpg"
                        onChange={this.handleChange}
                        id="mpg"
                        type="number"
                        name="mpg"
                        value={this.state.mpg}
                    />
                    <Form.Text>
                        Do not answer this question if you are an electric vehicle user
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        What is your zip code?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter your zip code"
                        onChange={this.handleChange}
                        id="zipcode"
                        type="number"
                        name="zipcode"
                        value={this.state.zipcode}
                    />
                    <Form.Text >
                        This question gets the gas prices in your area!
                    </Form.Text>
                </Form.Group>


                <label>
                    {this.state.city.length > 0 ? "Your city, state is " + this.state.city + ", " + this.state.statecode : ""}
                </label>
            </div>);
        } else {
            renderThis = (<div>
                <Form.Group>
                    <Form.Label>
                        If you drive an electric vehicle, how far can you drive on a full charge in miles?
                    </Form.Label>

                    <Form.Control
                        placeholder="fullcharge"
                        onChange={this.handleChange}
                        id="fullcharge"
                        type="number"
                        name="fullcharge"
                        value={this.state.fullcharge}
                    />
                    <Form.Text>
                        Do not answer this question if you are a gas vehicle user
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        If you drive an electric vehicle, how much does it cost for a full charge?
                    </Form.Label>

                    <Form.Control
                        placeholder="fullchargeCost"
                        onChange={this.handleChange}
                        id="fullchargeCost"
                        type="number"
                        name="fullchargeCost"
                        value={this.state.fullchargeCost}
                    />
                    <Form.Text>
                        Do not answer this question if you are a gas vehicle user
                    </Form.Text>
                </Form.Group>
            </div>);
        }

        

        return (
            <Container>

                <Jumbotron>
                    <h1>
                        Cost Per Mile Calculator

                    </h1>
                    <p>
                        Fill out these questions to the best of your abilitiy as they are the basis of calculating your cost per mile. You will be asked about information that you may not know about some of these questions so fill them out to the best of your ability.
                    </p>
                </Jumbotron>
                <Jumbotron>


                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>

                            <Form.Label>
                                How many miles do you usually drive per week?
                            </Form.Label>

                            <Form.Control type="number"
                                placeholder="Enter how many miles driven"
                                onChange={this.handleChange}
                                id="miles"
                                type="number"
                                name="miles"
                                value={this.state.miles}
                            />
                            <Form.Text className="text-muted">
                                Enter the miles you usually drive per week
                            </Form.Text>


                        </Form.Group>



                        <Form.Group>

                            <Form.Label>
                                How much have you paid for insurance a year?
                            </Form.Label>


                            <Form.Control
                                placeholder="Enter the amount of insurance paid per year"
                                onChange={this.handleChange}
                                id="insurance"
                                type="number"
                                name="iPaid"
                                value={this.state.iPaid}
                            />
                            <Form.Text className="text-muted">
                                Enter how much insurace you pay each year
                            </Form.Text>
                        </Form.Group>



                        <Form.Group>

                            <Form.Label>
                                How much have you paid for maitenance a year?
                            </Form.Label>


                            <Form.Control
                                placeholder="Enter how much you pay for maitenance a year"
                                onChange={this.handleChange}
                                id="maitenance"
                                type="number"
                                name="mait"
                                value={this.state.mait}
                            />
                            <Form.Text className="text-muted">
                                Enter how much you usually pay for maitenance in a year
                            </Form.Text>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>
                                How much do you pay for tolls every month?
                            </Form.Label>


                            <Form.Control
                                placeholder="Enter how much you pay for tolls"
                                onChange={this.handleChange}
                                id="tolls"
                                type="number"
                                name="tolls"
                                value={this.state.tolls}
                            />
                            <Form.Text className="text-muted">
                                Enter how much you usually pay for tolls every month
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                How much do you pay for other related car costs per year?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter your other car related costs throughout the year"
                                onChange={this.handleChange}
                                id="subscriptions"
                                type="number"
                                name="subscriptions"
                                value={this.state.subscriptions}
                            />


                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Enter your VIN(Vehicle Identification Number) here
                            </Form.Label>
                            <Form.Control
                                placeholder="VIN"
                                onChange={this.handleChange}
                                id="VIN"
                                type="text"
                                name="VIN"
                                value={this.state.VIN}
                            />
                            <Button
                                onClick={this.handleClick}
                            >
                                Submit your VIN to get official data from the NHTSA
                            </Button>
                            <Form.Text>
                                We are gathering this information in order to gather your mpg, car make, car model, and car year. If you do not know your VIN or do not want to share your VIN, enter the following questions to the best of your ability. However, if you do know your VIN, enter it and click the following button . Some data about your car may still be missing so answer the unaswered questions.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                What is your car make?
                            </Form.Label>
                            <Form.Control as="select"
                                placeholder="Enter your car make"
                                onChange={this.handleChange}
                                id="carMake"
                                type="text"
                                name="carMake"
                                value={this.state.carMake}
                            >
                                <option></option>
                                {allOptions}

                            </Form.Control>

                            <div>
                                {renderCarModel}

                            </div>

                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                What is your car year?
                            </Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                id="carYear"
                                name="carYear"
                                value={this.state.carYear}
                                as="select">
                                {carYears}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>

                            <Form.Label>
                                Are you an electric vehicle user or gas car user?
                            </Form.Label>


                            <Form.Control as="select"

                                onChange={this.handleChange}
                                id="isElectric"
                                type="text"
                                name="isElectric"
                                value={this.state.isElectric}
                            >
                                <option name="isElectric"></option>
                                <option name="isElectric">gas</option>
                                <option name="isElectric">electric</option>

                            </Form.Control>

                            <div>
                                {renderThis}
                            </div>

                        </Form.Group>


                        <br />
                        <br />



                        <Form.Group>
                            <Form.Label>
                                How much was this car when it was brand new?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter your original price"
                                onChange={this.handleChange}
                                id="originalPrice"
                                type="number"
                                name="originalPrice"
                                value={this.state.originalPrice}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                How much is your car worth now?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter the current price"
                                onChange={this.handleChange}
                                id="finalPrice"
                                type="number"
                                name="finalPrice"
                                value={this.state.finalPrice}
                            />
                        </Form.Group>
                        <input type="submit"
                        />
                    </Form>
                    <br />

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
                                <td>You</td>
                                <td>{this.state.costpermile.toFixed(2)}</td>
                                <td>{(this.state.costpermile - this.state.costpermile).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Average US Driver who drives 10k miles</td>
                                <td>{0.79}</td>
                                <td>{this.state.costpermile.toFixed(2) - 0.79>0? "+" + (this.state.costpermile.toFixed(2) - 0.79): this.state.costpermile.toFixed(2) - 0.79}</td>
                            </tr>
                            <tr>
                                <td>Average US Driver who drives 15k miles</td>
                                <td>{0.61}</td>
                                <td>{this.state.costpermile.toFixed(2) - 0.61>0? "+" + (this.state.costpermile.toFixed(2) - 0.61): this.state.costpermile.toFixed(2) - 0.61}</td>
                            </tr>
                            <tr>
                                <td>Average US Driver who drives 20k miles</td>
                                <td>{0.53}</td>
                                <td>{this.state.costpermile.toFixed(2) - 0.53>0? "+" + (this.state.costpermile.toFixed(2) - 0.53): this.state.costpermile.toFixed(2) - 0.53}</td>
                            </tr>
                            <tr>
                                <td>Average US Driver who drives a small sedan (10k miles)</td>
                                <td>{0.61}</td>
                                <td>{this.state.costpermile.toFixed(2) - 0.61>0? "+" + (this.state.costpermile.toFixed(2) - 0.61): this.state.costpermile.toFixed(2) - 0.53}</td>
                            </tr>
                            <tr>
                                <td>Average US Driver who drives a small sedan (10k miles)</td>
                                <td>{0.61}</td>
                                <td>{this.state.costpermile.toFixed(2) - 0.61>0? "+" + (this.state.costpermile.toFixed(2) - 0.61): this.state.costpermile.toFixed(2) - 0.53}</td>
                            </tr>
                        </tbody>
                    </Table>
                        Cost per mile: $ {this.state.costpermile.toFixed(2)}
                    
                    <p>

                        The average cost per mile is about $0.79 around the United States. The easiest way to improve your cost per mile is to drive more . The type of car that has the lowest average cost per mile is the small Sedan, and the type of car with the highest cost per mile is the pickup truck. The electric car has a good cost per mile; however, its depreciation costs exceed all other car types.
                        The cost per mile of the average electric vehicle is $0.5546
                    </p>
                    {this.state.costpermile >= 0.79 ? <p>Your data shows that your cost per mile is greater than or equal to the average cost per mile in the United States.</p> : <p>Your data shows that your cost per mile is below the average cost per mile. You are saving a lot of money as these miles add up over time!</p>}

                </Jumbotron>
            </Container>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
);
