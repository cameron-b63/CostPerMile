import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'

import Alert from 'react-bootstrap/Alert';
import OtherCPM from './OtherCPM.js'
import Header from './Components/Header.js'
import Question1 from './Components/Question1.js'
import Question2 from './Components/Question2.js'
import Question3 from './Components/Question3.js'
import Question4 from './Components/Question4.js'
import Question5 from './Components/Question5.js'
import Question6 from './Components/Question6.js'
import Question7 from './Components/Question7.js'
import Question8 from './Components/Question8.js'
import Question9 from './Components/Question9.js'
import Question10 from './Components/Question10.js'

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
            gallon: "",
            typeOfGas: "regular",
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
            licensePlate: "",
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
        this.setState({ depreciationValue: depreciation },
            function () {
                let final;
                if (this.state.isElectric.indexOf("as") > 0) {
                    final = (parseInt(this.state.depreciationValue) +
                        parseInt(this.state.iPaid) +
                        (((parseInt(this.state.miles) * 52) / parseInt(this.state.mpg)) * parseInt(this.state.gallon)) +
                        parseInt(this.state.mait) +
                        (parseInt(this.state.tolls) * 12) +
                        (parseInt(this.state.licensePlate)) )
                        / (parseInt(this.state.miles) * 52);
                } else {
                    final = (parseInt(this.state.depreciationValue) +
                        parseInt(this.state.iPaid) +
                        ((parseInt(this.state.miles) / parseInt(this.state.fullcharge)) * parseInt(this.state.fullchargeCost)) +
                        parseInt(this.state.mait) +
                        (parseInt(this.state.tolls) * 12) +
                        (parseInt(this.state.licensePlate))) /
                        (parseInt(this.state.miles) * 52);
                }
                this.setState({
                    costpermile: final
                })
            }
        );
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
        


        this.getCityState(this.state.zipcode);
        this.setState({
            submitted: true,
        })
        this.depreciate();
        if (this.state.isElectric.indexOf("as") > 0) {
            this.getGasPrice(this.state.statecode);
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
                            isElectric: fuelType,
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
                            if(self.state.typeOfGas === "regular"){
                                self.setState({
                                    gallon: city[0]["gasoline"]
                                })
                            }
                            else if(self.state.typeOfGas === "mid grade"){
                                self.setState({
                                    gallon:city[0]["midGrade"]
                                })
                            }
                            else if(self.state.typeOfGas === "premium"){
                                self.setState({
                                    gallon: city[0]["premium"]
                                })
                            }
                            else if(self.state.typeOfGas === "diesel"){
                                self.setState({
                                    gallon: city[0]["diesel"]
                                })
                            }
                           
                            console.log(self.state);
                        } else {
                            if(self.state.typeOfGas === "regular"){
                                self.setState({
                                    gallon: bodyJSON.result.state.gasoline
                                })
                            }
                            else if(self.state.typeOfGas === "mid grade"){
                                self.setState({
                                    gallon: bodyJSON.result.state.midGrade
                                })
                            }
                            else if(self.state.typeOfGas === "premium"){
                                self.setState({
                                    gallon: bodyJSON.result.state.premium
                                })
                            }
                            else if(self.state.typeOfGas === "diesel"){
                                self.setState({
                                    gallon: bodyJSON.result.state.diesel
                                })
                            }
                        }
                        let final;

                        if (self.state.isElectric.indexOf("as")> 0) {
                            final = (parseInt(self.state.depreciationValue) +
                                parseInt(self.state.iPaid) +
                                (((parseInt(self.state.miles) * 52) / parseInt(self.state.mpg)) * parseInt(self.state.gallon)) +
                                parseInt(self.state.mait) +
                                (parseInt(self.state.tolls) * 12) +
                                (parseInt(self.state.licensePlate)) )
                                / (parseInt(self.state.miles) * 52);
                        } else {
                            final = (parseInt(self.state.depreciationValue) +
                                parseInt(self.state.iPaid) +
                                ((parseInt(self.state.miles) / parseInt(self.state.fullcharge)) * parseInt(self.state.fullchargeCost)) +
                                parseInt(self.state.mait) +
                                (parseInt(self.state.tolls) * 12) +
                                (parseInt(self.state.licensePlate)) ) /
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
        var years = [];
        for (var i = 0; i < 100; i++) {
            years.push(2021 - i);
        }
        let renderZipAlert;
        let renderFuelQuestions;
        var lastQuestion;
        var renderRelationalData;
        var renderAlert;
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

        const carYears = years.map((num) => <option>{num}</option>)
        allOptions2 = this.state.models.map((num) => <option>{num.Model_Name}</option>)


        if (typeof this.state.statecode === 'undefined') {
            renderZipAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>Please enter a valid Zip Code</p>
                </Alert>
            );
        } else if (this.state.statecode.length === 0) {
            renderZipAlert = <div></div>
        }
        else {
            renderZipAlert = (
                <Alert variant="success">
                    <Alert.Heading>Success</Alert.Heading>
                    <p>Your city, state is {this.state.city}, {this.state.statecode} where it costs ${this.state.gallon} per gallon</p>
                </Alert>

            )
        }

        // CONDITIONAL RENDERING BASED ON USER CHOICE IF ELECTRIC OR NOT
        if (this.state.isElectric.indexOf("as") > 0) {
            renderFuelQuestions = (<div><Form.Group>
                <Form.Label>
                    a. What fuel type do you use?
                </Form.Label>
                <Form.Control as="select"
                    onChange={this.handleChange}
                    id="typeOfGas"
                    type="text"
                    name="typeOfGas"
                    value={this.state.typeOfGas}
                    required
                >
                    <option name="typeOfGas">regular</option>
                    <option name="typeOfGas">mid grade</option>
                    <option name="typeOfGas">premium</option>
                    <option name="typeOfGas">diesel</option>
                </Form.Control>
               
            </Form.Group>
                <Form.Group>
                    <Form.Label>
                        b. What is your MPG(Miles Per Gallon)?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter your mpg"
                        onChange={this.handleChange}
                        id="mpg"
                        type="text"
                        name="mpg"
                        value={this.state.mpg}
                        required
                    />
                   
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        c. What is your zip code?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter your zip code. This is needed to find gas prices in your area"
                        onChange={this.handleChange}
                        id="zipcode"
                        type="text"
                        name="zipcode"
                        value={this.state.zipcode}
                        required
                    />
                
                </Form.Group>

                {renderZipAlert}

            </div>);
        } else if (this.state.isElectric.indexOf("lectric") > 0) {
            renderFuelQuestions = (<div>
                <Form.Group>
                    <Form.Label>
                        a. If you drive an electric vehicle, how far can you drive on a full charge in miles?
                    </Form.Label>

                    <Form.Control
                        placeholder="fullcharge"
                        onChange={this.handleChange}
                        id="fullcharge"
                        type="text"
                        name="fullcharge"
                        value={this.state.fullcharge}
                        required
                    />
                   
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        b. If you drive an electric vehicle, how much does it cost for a full charge?
                    </Form.Label>

                    <Form.Control
                        placeholder="fullchargeCost"
                        onChange={this.handleChange}
                        id="fullchargeCost"
                        type="text"
                        name="fullchargeCost"
                        value={this.state.fullchargeCost}
                        required
                    />
                    
                </Form.Group>
            </div>);
        } else {
            renderFuelQuestions = (
                <div></div>
            );
        }
       

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
        //RENDER ALERT
        if (Number.isNaN(this.state.costpermile) && this.state.submitted) {
            renderAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>You have some unaswered questions. To see your results, you must fill out all questions.</p>
                </Alert>
            );
        } else if(!(Number.isNaN(this.state.costpermile)) &&this.state.submitted){
            renderAlert = 
            (
            <Alert variant = "success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>scroll down to see results</p>
            </Alert>
            )
        }
        
        else {
            renderAlert = (<div></div>)
        }


        return (

            //

            <Container>

                <Header />
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Jumbotron>
                        <h2>Vehicle Information (Section 1/3)</h2>

                        <Question1 state = {this.state} onChange = {this.handleChange} carMakeAlert = {renderCarMakeAlert} onClick = {this.handleClick}/>
                        
                        <Form.Label>
                            2. Enter in your car info below if you do not remember your VIN
                        </Form.Label>
                        <Question2 _state = {this.state} _handleChange = {this.handleChange} _carYears = {carYears} _allOptions = {allOptions} _allOptions2 = {allOptions2}/>
                    
                        <Question3 _state = {this.state} _handleChange = {this.handleChange} _renderFuelQuestions = {renderFuelQuestions}/>                         
                        {renderFuelQuestions}
                        
                    </Jumbotron>

                    <Jumbotron>
                        <h2>Ownership Costs (Section 2/3)</h2>

                        <Question4 state = {this.state} onChange = {this.handleChange}/>

                        <Question5 _state = {this.state} _handleChange = {this.handleChange}/>
                        
                        <Question6 _state = {this.state} _handleChange = {this.handleChange}/>

                        <Question7 _state = {this.state} _handleChange = {this.handleChange}/>
                        
                       
                    </Jumbotron>


                    <Jumbotron>
                        <h2>Operating Costs (Section 3/3)</h2>

                        <Question8 _state = {this.state} _handleChange = {this.handleChange}/>

                        <Question9 _state = {this.state} _handleChange = {this.handleChange}/>
                        
                        <Question10 _state = {this.state} _handleChange = {this.handleChange}/>
                        {renderAlert}
                        <input type="submit"
                        />
                        
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