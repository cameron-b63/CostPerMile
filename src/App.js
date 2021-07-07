import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import OtherCPM from './OtherCPM.js'
function compare(a, b) {
    const nameA = a.Make_Name;
    const nameB = b.Make_Name;
    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costpermile: NaN,
            iPaid: "",
            miles: "",
            mait: "",
            api: require('./carmakes.json')["Results"].sort(compare),
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
            seeOtherCPM: "",
            otherFamousCars: require('./famouscars.json')["Results"].sort(compare),
            submitted: false,
            validated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        //depreciationValue will not update
        this.depreciate();
    
        this.getCityState(this.state.zipcode);
        this.setState({
            submitted: true,
        })

        if (this.state.isElectric.indexOf("as") > 0) {
            this.getGasPrice(this.state.statecode);
        } else {
            let final;
            if (this.state.isElectric.indexOf("as") > 0) {
                final = (parseInt(this.state.depreciationValue) +
                    parseInt(this.state.iPaid) +
                    (((parseInt(this.state.miles) * 52) / parseInt(this.state.mpg)) * parseInt(this.state.gallon)) +
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
            this.setState({
                costpermile: final
            })
        }

        this.setState({ validated: true });

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

                        })
                        console.log(this.state);
                    }
                })
        }
    }

    getCityState(zip) {
        if (zip.length > 0) {
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

            const http = require("https");


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
                    if (typeof self.state.statecode === 'undefined');
                    self.setState({
                        statecode: bodyJSON.state,
                        city: bodyJSON.city,
                    })

                    self.getGasPrice(self.state.statecode)

                });
            })

            req.end();



        }
    }
    getGasPrice(state) {
        if (typeof state !== 'undefined') {
            if (state.length > 0) {
                var http = require("https");

                var options = {
                    "method": "GET",
                    "hostname": "api.collectapi.com",
                    "port": null,
                    "path": "/gasPrice/stateUsaPrice?state=" + state.toUpperCase(),
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "apikey 1xlYvCDfg8hkQzETYVoiv5:5JGIXWt5xUUG6xw4xv3UNa"
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
                            console.log(self.state);
                        } else {
                            //const myTypeOfGas = eval(self.state.typeOfGas)
                            /*
                           self.setState({
                               //This line does not work for some reason
                               
                               gallon: bodyJSON.result.state.eval(self.state.typeOfGas)
                           })
                           */
                          self.setState({
                              gallon:bodyJSON.result.state.gasoline
                          })
                            console.log(self.state.gallon);
                        }

                        let final;
                        
                        if (self.state.mpg.length > 0) {
                            final = (parseInt(self.state.depreciationValue) +
                                parseInt(self.state.iPaid) +
                                (((parseInt(self.state.miles) * 52) / parseInt(self.state.mpg)) * parseInt(self.state.gallon)) +
                                parseInt(self.state.mait) +
                                (parseInt(self.state.tolls) * 12) +
                                parseInt(self.state.subscriptions))
                                / (parseInt(self.state.miles) * 52);
                        } else {
                            final = (parseInt(self.state.depreciationValue) +
                                parseInt(self.state.iPaid) +
                                ((parseInt(self.state.miles) / parseInt(self.state.fullcharge)) * parseInt(self.state.fullchargeCost)) +
                                parseInt(self.state.mait) +
                                (parseInt(self.state.tolls) * 12) +
                                parseInt(self.state.subscriptions)) /
                                (parseInt(self.state.miles) * 52);
                        }
                        self.setState({
                            costpermile: final
                        });
                    });
                });
                req.end();
                

            }
        }
    }


    componentDidMount() {

    }
    render() {
        let allOptions;
        allOptions = this.state.api.map((num) => <option>{num.Make_Name}</option>)
        let allOptions2;
        let renderCarMakeAlert;
        if (this.state.carMake === null) {
            renderCarMakeAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Not Valid VIN</Alert.Heading>
                </Alert>
            )
        }
        else if (this.state.carMake.length > 0) {
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

        let renderZipAlert;

        if (typeof this.state.statecode === 'undefined') {
            renderZipAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning</Alert.Heading>
                    <p>Please enter a valid Zip code</p>
                </Alert>
            );
        } else if (this.state.statecode.length === 0) {
            renderZipAlert = <div></div>
        }
        else {
            renderZipAlert = (
                <Alert variant="success">
                    <Alert.Heading>Success</Alert.Heading>
                    <p>Your city, state is {this.state.city}, {this.state.statecode}</p>
                </Alert>

            )
        }
        let renderFuelQuestions;
        // CONDITIONAL RENDERING BASED ON USER CHOICE IF ELECTRIC OR NOT
        if (this.state.isElectric.indexOf("as") > 0) {
            renderFuelQuestions = (<div><Form.Group>
                <Form.Label>
                    8a. What fuel type do you use?
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
                        8b. What is your MPG(Miles Per Gallon)?
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
                        8c. What is your zip code?
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

                {renderZipAlert}

            </div>);
        } else if (this.state.isElectric.indexOf("lectric") > 0) {
            renderFuelQuestions = (<div>
                <Form.Group>
                    <Form.Label>
                        8a. If you drive an electric vehicle, how far can you drive on a full charge in miles?
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
                        8b. If you drive an electric vehicle, how much does it cost for a full charge?
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
        } else {
            renderFuelQuestions = (
                <div></div>
            );
        }
        //STORING THE LAST QUESTION

        var lastQuestion;
        if (Number.isNaN(this.state.costpermile)) {
            lastQuestion = (<Form.Group>
                <Form.Label>
                    10. How much is your car worth now?
                </Form.Label>
                <Form.Control
                    placeholder="Enter the current price"
                    onChange={this.handleChange}
                    id="finalPrice"
                    type="number"
                    name="finalPrice"
                    value={this.state.finalPrice}
                    required
                />
                <Form.Text className="text-muted">
                    Enter your car's current worth
                </Form.Text>
            </Form.Group>);
        } else {
            lastQuestion = (<Form.Group>
                <Form.Label>
                    10. How much is your car worth now?
                </Form.Label>
                <Form.Control
                    placeholder="Enter the current price"
                    onChange={this.handleChange}
                    id="finalPrice"
                    type="number"
                    name="finalPrice"
                    value={this.state.finalPrice}
                    required
                />
                <Form.Text className="text-muted">
                    Enter your car's current worth
                </Form.Text>
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>Scroll down to see your results!</p>
                </Alert>
                <br />
                <img src="https://i.pinimg.com/564x/5e/8f/37/5e8f3769652154c09064e81af4ea0f8a.jpg" className="myImage" />
            </Form.Group>);
        }
        //CONDITIONAL RENDERING FOR RELATIONAL DATA
        var renderRelationalData;
        if (Number.isNaN(this.state.costpermile)) {
            renderRelationalData = <div></div>
        }
        else {
            renderRelationalData =
                (
                    <Form.Group>
                        <h2>See Your CPM in relation to other CPM</h2>
                        <p>If you choose to see "Average CPM for other cars", the cost per mile is calculated assuming that you drive 15k miles per year, ~2000 for insurance, ~1300 for fuel, ~1300 for maitenance/repairs, and ~1300 for other miscellaneous costs</p>
                        <Form.Label>
                            Enter what information you would like to see
                        </Form.Label>
                        <Form.Control as="select"
                            onChange={this.handleChange}
                            id="seeOtherCPM"
                            type="text"
                            name="seeOtherCPM"
                            value={this.state.seeOtherCPM}
                        >
                            <option name="seeOtherCPM">-Choose one of the below-</option>
                            <option name="seeOtherCPM">CPM of Average Car Types for 10k miles per year (192 miles a week)</option>
                            <option name="seeOtherCPM">CPM of Average Car Types for 15k miles per year (288 miles a week)</option>
                            <option name="seeOtherCPM">CPM of Average Car Types for 20k miles per year (384 miles a week)</option>
                            <option name="seeOtherCPM">Average CPM For Other Cars (15000 miles a year or 288 miles a week)</option>
                        </Form.Control>
                        {OtherCPM(this.state)}
                    </Form.Group>
                );
        }
        var renderAlert;
        if (Number.isNaN(this.state.costpermile) && this.state.submitted) {
            renderAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>You have some unaswered questions. To see your results, you must fill out all questions.</p>
                </Alert>
            );
        } else {
            renderAlert = (<div></div>)
        }


        return (
            <Container>

                <Jumbotron>
                    <h1>
                        10 Question Cost Per Mile Calculator
                    </h1>
                    <p>
                        Fill out these questions to the best of your abilitiy as they are the basis of calculating your cost per mile. You will be asked about information that you may not know about some of these questions so fill them out to the best of your ability.
                    </p>
                </Jumbotron>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Jumbotron>
                        <h2>Fixed Costs (Section 1/3)</h2>
                        <Form.Group>

                            <Form.Label>
                                1. How much have you paid for insurance a year?
                            </Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter the amount of insurance paid a year"
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
                                2. How much have you paid for maintenance and repairs a year?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter how much you pay for maintenance a year"
                                onChange={this.handleChange}
                                id="maitenance"
                                type="number"
                                name="mait"
                                value={this.state.mait}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter how much you usually pay for maitenance in a year
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                3. How much do you pay for other related car costs a year? (subscriptions, parking, etc.)
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter your other car related costs throughout the year"
                                onChange={this.handleChange}
                                id="subscriptions"
                                type="number"
                                name="subscriptions"
                                value={this.state.subscriptions}
                                required
                            />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Enter how much you pay for other related car costs a year.
                        </Form.Text>
                    </Jumbotron>


                    <Jumbotron>
                        <h2>Variable Costs (Section 2/3)</h2>
                        <Form.Group>
                            <Form.Label>
                                4. How much do you pay for tolls every month?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter how much you pay for tolls"
                                onChange={this.handleChange}
                                id="tolls"
                                type="number"
                                name="tolls"
                                value={this.state.tolls}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter how much you usually pay for tolls every month
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>

                            <Form.Label>
                                5. How many miles do you usually drive per week?
                            </Form.Label>
                            <Form.Control type="number"
                                placeholder="Enter how many miles driven"
                                onChange={this.handleChange}
                                id="miles"
                                type="number"
                                name="miles"
                                value={this.state.miles}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter the miles you usually drive per week
                            </Form.Text>
                        </Form.Group>
                    </Jumbotron>

                    <Jumbotron>
                        <h2>Vehicle Specific Costs (Section 3/3)</h2>
                        <Form.Group>
                            <Form.Label>
                                6. Enter your VIN(Vehicle Identification Number) here
                            </Form.Label>
                            <Form.Control
                                placeholder="VIN (Optional) "
                                onChange={this.handleChange}
                                id="VIN"
                                type="text"
                                name="VIN"
                                value={this.state.VIN}
                                required
                            />
                            {renderCarMakeAlert}
                            <Button
                                onClick={this.handleClick}
                            >
                                Submit your VIN to get official data from the NHTSA
                            </Button>
                            <Form.Text className="text-muted">
                                We are gathering this information in order to gather your mpg, car make, car model, and car year. If you do not know your VIN or do not want to share your VIN, enter the following questions to the best of your ability. However, if you do know your VIN, enter it and click the following button . Some data about your car may still be missing so answer the unaswered questions.
                            </Form.Text>
                        </Form.Group>
                        <h5>
                            7. Enter in your car info below if you do not remember your VIN
                        </h5>
                        <Form.Row>

                            <Form.Group>
                                <Form.Label>
                                    Year
                                </Form.Label>

                                <Form.Control
                                    onChange={this.handleChange}
                                    id="carYear"
                                    name="carYear"
                                    value={this.state.carYear}
                                    required
                                    as="select"
                                >
                                    <option></option>
                                    {carYears}

                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Enter in your car info
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Make
                                </Form.Label>
                                <Form.Control as="select"
                                    placeholder="Enter your car make"
                                    onChange={this.handleChange}
                                    id="carMake"
                                    type="text"
                                    name="carMake"
                                    value={this.state.carMake}
                                    required
                                >
                                    <option></option>

                                    {allOptions}

                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Model
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    onChange={this.handleChange}
                                    id="carModel"
                                    name="carModel"
                                    value={this.state.carModel}

                                >
                                    <option></option>
                                    {allOptions2}
                                </Form.Control>
                            </Form.Group>

                        </Form.Row>
                        <Form.Group>

                            <Form.Label>
                                8. Are you an electric vehicle user or gas car user?
                            </Form.Label>


                            <Form.Control as="select"

                                onChange={this.handleChange}
                                id="isElectric"
                                type="text"
                                name="isElectric"
                                value={this.state.isElectric}
                                required
                            >
                                <option name="isElectric"></option>
                                <option name="isElectric">gas</option>
                                <option name="isElectric">electric</option>

                            </Form.Control>

                            <div>
                                {renderFuelQuestions}
                            </div>
                            <Form.Text className="text-muted">
                                Enter whether your car is electric or fueled by gas by clicking on the drop down.
                            </Form.Text>

                        </Form.Group>


                        <Form.Group>
                            <Form.Label>
                                9. How much was this car when it was brand new?
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter your original price"
                                onChange={this.handleChange}
                                id="originalPrice"
                                type="number"
                                name="originalPrice"
                                value={this.state.originalPrice}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter how much money the car costed when it was brand new
                            </Form.Text>
                        </Form.Group>
                        <div>{lastQuestion}</div>
                        <input type="submit"
                        />
                        {renderAlert}
                    </Jumbotron>

                </Form>
                <br />

                {/*CONDITIONAL RENDERING IF CPM IS NOT NaN */}
                {renderRelationalData}
            </Container>
        );
    }
}

export default Calculator