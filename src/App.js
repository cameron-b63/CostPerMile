import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './carmakes.json'

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


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
import NewCost from './Components/NewCost.js'
import NowCost from './Components/NowCost.js'
import Loan from './Components/Loan.js'
import Rental from './Components/Rental.js'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Chart from "react-google-charts";
import useWindowDimensions from './windowDimensions.js'

/**
 * Makes sure that make renders only after a certain period of time after user chose model
 * @var {number} count 
 */
var count = 0;
 /**
  * compares the numbers 
  * @param {string} a first word
  * @param {string} b second word
  * @returns {number} comparison
  */
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
/**
 * second comparison for (numbers)
 * @param {number} a first number
 * @param {number} b second number
 * @returns comparison of the two
 */
function compare2(a, b) {
    const nameA = a.CPM;
    const nameB = b.CPM;
    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
}
/**
 * 
 * @param {*} labels 
 * @param {*} CPMs 
 * @returns arr
 */
function getBarData(labels, CPMs) {
    var arr = [];
    arr.push(['Name of Car', 'CPM', { role: 'style' }])
    for (var i = 0; i < labels.length; i++) {
        arr.push([labels[i], CPMs[i], '#176BEF'])
    }
    return arr;
}
/**
 * Represents the entire calculator class
 * @extends React.Component
 */

class Calculator extends React.Component {
    /**
     * 
     * @param {props} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            /**
             * final cost per mile calculation
             */
            costpermile: 1,
            /**
             * insurance cost over the year
             */
            iPaid: "",
            /**
             * miles driven per week
             */
            miles: "",
            /**
             * maintenance paid over the year
             */
            mait: "",
            /**
             * Car makes from carmakes.json
             */
            api: require('./carmakes.json')["Results"].sort(compare),
            /**
             * array of models that is filled using NHTSA API
             */
            models: [],
            /**
             * original price of the car when first bough
             */
            originalPrice: "",
            /**
             * Final price of the car when filling out the form
             */
            finalPrice: "",
            /**
             * Cost of 'other costs' every month
             */
            tolls: "",
            /**
             * State simplified in 2 characters ex. TX
             */
            statecode: "",
            /**
             * MPG of the car
             */
            mpg: "",
            /** 
             * price for 1 gallon of gas
             */
            gallon: "",
            /**
             * regular, midGrade, premium, or diesel
             */
            typeOfGas: "regular",
            /**
             * city that user lives in
             */
            city: "",
            /**
             * VIN of car
             */
            VIN: "",
            /**
             * result of the vin API 
             */
            VINAPI: "",
            /**
             * depreciation of the car over the next year
             */
            depreciationValue: "",
            /** 
             *  how many miles user can drive on a full charge
             */
            fullcharge: "",
            /**
             * cost of a full charge
             */
            fullchargeCost: "",
            /**
             * zip code of the user
             */
            zipcode: "",
            /**
             * User's car make
             */
            carMake: "",
            /**
             * User's Car model
             */
            carModel: "",
            /**
             * response to question if user uses electric vehicle or not
             */
            isElectric: "",
            /**
             * car year of the user's car
             */
            carYear: "",
            /**
             * year that the user bought their car
             */
            boughtCarYear: "",
            /**
             * base price of user's car
             */
            carBasePrice: "",
            /**
             * first selection to compare other cars at bottom section
             */
            seeOtherCPM: "Indigo Alpha",
            /**
             * second selection to compare other cars at bottom section
             */
            seeOtherCPM2: "Indigo Bravo",
            /**
             * third selection to compare other cars at bottom section
             */
            seeOtherCPM3: "",
            /**
             * array of the other famous cars' data
             */
            otherFamousCars: require('./famouscars.json')["Results"],
            /**
             * length of otherFamousCars
             */
            otherFamousCarsLength: 0,
            /**
             * sorted version of otherFamousCars
             */
            sortedOtherFamousCars: [],
            /**
             * whether or not user has submitted the form
             */
            submitted: false,
            /**
             * Form validation variable
             */
            validated: false,
            /**
             * Whether user chose if they rent/lease car or bought car
             */
            isRental: "",
            /**
             * monthly cost for user for renting/leasing/loans
             */
            monthlyCarPay: "",
            /**
             * Determines to render carfax iFrame
             */
            CarFax: false,
            /**
             * determinds whether to render graph
             */
            graphRender: false,
            /**
             * width of screen
             */
            width: 0,
            /**
             * heigh of screen
             */
            height: 0,
        }
        /**
         * graphData
         */
        this.graphData = {
            labels: this.state.otherFamousCars.map((x) => x.Name),
            datasets: [{
                label: 'Cost Per Mlie of different cars',
                data: this.state.otherFamousCars.map((x) => x.CPM),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMake = this.handleChangeMake.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickVIN = this.handleClickVIN.bind(this);
        this.handleClickGasPrice = this.handleClickGasPrice.bind(this);
        this.handleClickCarFax = this.handleClickCarFax.bind(this);
        this.handleClickGraph = this.handleClickGraph.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);


    }
    /**
     * depreciate function
     * changes this.state.depreciationValue
     */
    depreciate() {
        let depreciation;

        if (this.state.isRental === "bought") {
            depreciation = -100 * (Math.pow((parseFloat(this.state.finalPrice) / parseFloat(this.state.originalPrice)), (1 / (2021 - parseFloat(this.state.boughtCarYear)))) - 1)
            depreciation = this.state.finalPrice - (this.state.finalPrice * (1 - (depreciation / 100)));

        }
        else {
            depreciation = 0;
        }
        this.setState({ depreciationValue: depreciation },
            function () {
                let final;
                if (this.state.isElectric.indexOf("as") > 0) {
                    final = (parseFloat(this.state.depreciationValue) +
                        parseFloat(this.state.iPaid) +
                        (((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon)) +
                        parseFloat(this.state.mait) +
                        (parseFloat(this.state.tolls) * 12) +
                        (parseFloat(this.state.monthlyCarPay) * 12))
                        / (parseFloat(this.state.miles) * 52);
                } else {
                    final = (parseFloat(this.state.depreciationValue) +
                        parseFloat(this.state.iPaid) +
                        (((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost)) +
                        parseFloat(this.state.mait) +
                        (parseFloat(this.state.tolls) * 12) +
                        (parseFloat(this.state.monthlyCarPay) * 12)) /
                        (parseFloat(this.state.miles) * 52);
                }
                this.setState({
                    costpermile: final
                })
            }
        );

    }
    /**
     * Checks whether user can submit question
     * @param {string} s string to check
     * @returns {boolean} whether the user can submit alphabet characters or strictly numbers
     */
    alphabetCheck(s) {
        var numbers = /^[0-9|.]+$/;
        if ((s.length === 0 || s.match(numbers))) {
            return true;
        }
        else {
            alert("This is a numeric field only");
            return false;
        }

    }
    /**
     * handles whenever the user changes a single question
     * @param {event} event event
     * @event event
     */
    handleChange(event) {
        const { name, value } = event.target
        //checking for alphabetical letters so that there are no errors in calculations
        if (name === "carMake") {
            count = 0;
        }
        if (name !== "VIN" && name !== "carMake" && name !== "carYear" && name !== "carModel" && name !== "isElectric" && name !== "typeOfGas" && name !== "seeOtherCPM3" && name !== "seeOtherCPM2" && name !== "seeOtherCPM" && name !== "isRental") {
            if (this.alphabetCheck(value)) {
                this.setState({
                    [name]: value,
                });
            }
        }
        else {
            this.setState({
                [name]: value,
            })
        }
        console.log(this.state);
    }
    handleChangeMake(e){
        count = 0;
        var carModels = [];
        var theCarMake = "";
        const { name, value } = e.target
        this.setState({
            [name]:value
        })
        theCarMake = value;
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/' + theCarMake + '?format=json')
        .then(response => response.json())
        .then(data => {
            this.setState({ models: data["Results"] });
            carModels = data["Results"];
            count = 6;
            
        })
        
       


    }
    /**
     * handles click if user clicks on the VIN button
     * @param {*} e event
     * @event e
     */
    handleClickVIN(e) {
        this.setState({ carModel: "", carMake: "" }, function () {
            this.getVIN(this.state.VIN);

        })
        count = 0;
    }
    /**
     * gets citystate based on zip code when user presses on button
     * @param {*} e event
     * @event e
     */
    handleClickGasPrice(e) {
        this.getCityState(this.state.zipcode);
    }
    /**
     * when user clicks on carfax iFrame button, this shows the iFrame and updates
     */
    handleClickCarFax() {
        this.setState(function (past) {
            return { CarFax: !past.CarFax }
        })
    }
    /**
     * @event 
     * shows sorted graph or unsorted based on when user clicks
     */
    
    handleClickGraph() {
        if (this.state.graphRender) {
            this.graphData = {
                labels: this.state.otherFamousCars.map((x) => x.Name),
                datasets: [{
                    label: 'Cost Per Mlie of different cars',
                    data: this.state.otherFamousCars.map((x) => x.CPM),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        } else {
            this.graphData = {
                labels: this.state.otherFamousCars.slice().sort(compare2).map((x) => x.Name),
                datasets: [{
                    label: 'Cost Per Mlie of different cars',
                    data: this.state.otherFamousCars.slice().sort(compare2).map((x) => x.CPM),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        }
        this.setState(function (past) {
            return { graphRender: !past.graphRender }
        })
        
    }
    /**
     * handles the final submit of the form
     * @param {*} e 
     */
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true,
        })
        this.depreciate();


        this.setState({ validated: true });

    }
    /**
     * gets data based on vin
     * data includes make, model, year,baseprice, fueltype,mpg
     * @param {*} vin vin of car
     */
    getVIN(vin) {
        var make;
        var model;
        var modelYear;
        var basePrice;
        var fuelType;
        if (vin.length > 0) {
            /**
             * API call from NHTSA
             */
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
                            } else if (fuelType.indexOf("lectr") > 0) {
                                fuelType = "electric"
                            }
                            else {
                                fuelType = ""
                            }
                        } else {
                            fuelType = ""
                        }
                        /**
                         * @this Calculator
                         */
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
        /**
         * second API call to get MPG
         */

        const http = require("https");

        const options = {
            "method": "GET",
            "hostname": "vindecoder.p.rapidapi.com",
            "port": null,
            "path": "/v2.0/decode_vin?vin=" + vin,
            "headers": {
                "x-rapidapi-key": "73d45d6313mshd16f17ab16d3fe8p1368ecjsn7f132604eddb",
                "x-rapidapi-host": "vindecoder.p.rapidapi.com",
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
                var citymileage = bodyJSON.specification.city_mileage;
                var highwaymileage = bodyJSON.specification.highway_mileage;
                if (citymileage !== null) {
                    var Numcitymileage = parseFloat(citymileage.substring(0, citymileage.indexOf(" ")));
                    var Numhighwaymileage = parseFloat(highwaymileage.substring(0, highwaymileage.indexOf(" ")));
                    var mileage = (Numcitymileage + Numhighwaymileage) / 2;
                    self.setState({
                        mpg: mileage
                    });
                }

            });
        });

        req.end();
    }
    /**
     * calls API to get city and state based off of zip code
     * @param {string} zip zipcode of the user
     */
    getCityState(zip) {
        this.setState({
            gallon: "loading"
        });
        if (zip.length > 0 && this.state.isElectric.indexOf("as") > 0) {
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
    /**
     * gets gas price based off of city, state
     * @param {string} state this.state.statecode
     */
    getGasPrice(state) {
        if (typeof state !== 'undefined') {
            if (state.length > 0 && this.state.isElectric.indexOf("as") > 0) {
                var http = require("https");

                var options = {
                    "method": "GET",
                    "hostname": "api.collectapi.com",
                    "port": null,
                    "path": "/gasPrice/stateUsaPrice?state=" + state.toUpperCase(),
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "apikey 6jwMhjlXWz2rcXdhdpLjz6:4X6MQAYjbRiFWwNAxcc5k1"
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
                            if (self.state.typeOfGas === "regular") {
                                self.setState({
                                    gallon: city[0]["gasoline"]
                                })
                            }
                            else if (self.state.typeOfGas === "mid grade") {
                                self.setState({
                                    gallon: city[0]["midGrade"]
                                })
                            }
                            else if (self.state.typeOfGas === "premium") {
                                self.setState({
                                    gallon: city[0]["premium"]
                                })
                            }
                            else if (self.state.typeOfGas === "diesel") {
                                self.setState({
                                    gallon: city[0]["diesel"]
                                })
                            }

                            console.log(self.state);
                        } else {
                            if (self.state.typeOfGas === "regular") {
                                self.setState({
                                    gallon: bodyJSON.result.state.gasoline
                                })
                            }
                            else if (self.state.typeOfGas === "mid grade") {
                                self.setState({
                                    gallon: bodyJSON.result.state.midGrade
                                })
                            }
                            else if (self.state.typeOfGas === "premium") {
                                self.setState({
                                    gallon: bodyJSON.result.state.premium
                                })
                            }
                            else if (self.state.typeOfGas === "diesel") {
                                self.setState({
                                    gallon: bodyJSON.result.state.diesel
                                })
                            }
                        }

                    });
                });
                req.end();


            }
        }
    }

    /**
     * react lifetime function
     * Used mainly for getting window dimensions
     */
    componentDidMount() {
        this.setState({
            otherFamousCarsLength: this.state.otherFamousCars.length
        })
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    /**
     * react lifetime function
     * Used mainly for getting window dimensions
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    /**
     * react lifetime function
     * Used mainly for getting window dimensions
     */
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    /**
     * react render function
     * @returns {object}The entire page in JSX
     */
    render() {
        /**
         * allOptions to display for Make Question
         */
        let allOptions;
        allOptions = this.state.api.map((num) => <option>{num.Make_Name}</option>)
        /**
         * allOption2 to display all Models based on Make on Model Question
         */
        let allOptions2;
        /**
         * renders an alert if user has invalid VIN
         */
        let renderCarMakeAlert;
        /**
         * array of the past 100 years
         */
        var years = [];
        for (var i = 0; i < 100; i++) {
            years.push(2021 - i);
        }
        /**
         * renders an alert based on zip when user submits their zip code
         */
        let renderZipAlert;
        /**
         * renders several questions based on what fuel type the user has
         */
        let renderFuelQuestions;
        /**
         * Renders a ton of data when user submits their form
         */
        var renderRelationalData;
        /**
         * Renders alert when user submits their form
         */
        var renderAlert;

        /**
         * pulls data from API based on if user has entered their caramek
         */
        if (this.state.carMake === null) {
            renderCarMakeAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Invalid VIN</Alert.Heading>
                </Alert>
            )
        }
        else if (this.state.carMake.length > 0 && count < 10) {
            fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/' + this.state.carMake + '?format=json')
            .then(response => response.json())
            .then(data => {
                this.setState({ models: data["Results"] });
            })
        count++;

        }
        /**
         * past carYears
         */
        const carYears = years.map((num) => <option>{num}</option>)
        /**
         * allOptions2 is all of the Models
         */
        allOptions2 = this.state.models.map((num) => <option>{num.Model_Name}</option>)

        /**
         * renders alert based on statecode and gallon price
         */
        if (typeof this.state.statecode === 'undefined') {
            renderZipAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>Please enter a valid Zip Code</p>
                </Alert>
            );
        } else if (this.state.gallon === "loading") {
            renderZipAlert =
                (<Alert variant="secondary">
                    <Alert.Heading>Loading...</Alert.Heading>
                </Alert>
                )
        }

        else if (this.state.statecode.length === 0) {
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

        /**
         * modifies renderFuelQuestions based on whether user chose electric or gas
         */
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
                    <Form.Text className="text-muted">Average MPG around the US is 24.9</Form.Text>

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
                <Button
                    onClick={this.handleClickGasPrice}
                >Click this button to get the gas price in your area!
                </Button>
                {renderZipAlert}

            </div>);
        } else if (this.state.isElectric.indexOf("lectric") > 0) {
            renderFuelQuestions = (<div>
                <Form.Group>
                    <Form.Label>
                        a. If you drive an electric vehicle, how far can you drive on a full charge in miles?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter how many miles can be drive on a full charge"
                        onChange={this.handleChange}
                        id="fullcharge"
                        type="text"
                        name="fullcharge"
                        value={this.state.fullcharge}
                        required
                    />
                    <Form.Text className="text-muted">Average in the US is 181 miles</Form.Text>


                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        b. If you drive an electric vehicle, how much does it cost for a full charge?
                    </Form.Label>

                    <Form.Control
                        placeholder="Enter how much money it costs for a full charge"
                        onChange={this.handleChange}
                        id="fullchargeCost"
                        type="text"
                        name="fullchargeCost"
                        value={this.state.fullchargeCost}
                        required
                    />
                    <Form.Text className="text-muted">Varies depending on car. Average in the US is $9</Form.Text>


                </Form.Group>
            </div>);
        } else {
            renderFuelQuestions = (
                <div></div>
            );
        }

        /**
         * renders relational data based on certain parameters
         * @see {file} "./otherCPM.js"
         * 
         */
        var renderCarOptions = this.state.otherFamousCars.slice(1, this.state.otherFamousCars.length).map((N) => <option>{N.Name}</option>)
        if (Number.isNaN(this.state.costpermile)) {
            renderRelationalData = <div></div>
        }
        else {
            if (this.state.otherFamousCars.length < this.state.otherFamousCarsLength) {
                this.state.otherFamousCars.unshift({
                    Name: "Your Cost Per Mile",
                    CPM: this.state.costpermile
                })
            } else {
                this.state.otherFamousCars[0] =
                {
                    Name: "Your Cost Per Mile",
                    CPM: this.state.costpermile
                }
            }

            //rendering the bar data for the first time
            if (!this.state.graphRender) {
                this.graphData = {
                    labels: this.state.otherFamousCars.map((x) => x.Name),
                    datasets: [{
                        label: 'Cost Per Mlie of different cars',
                        data: this.state.otherFamousCars.map((x) => x.CPM),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            } else {
                this.graphData = {
                    labels: this.state.otherFamousCars.slice().sort(compare2).map((x) => x.Name),
                    datasets: [{
                        label: 'Cost Per Mlie of different cars',
                        data: this.state.otherFamousCars.slice().sort(compare2).map((x) => x.CPM),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            }

            const doughnutdata = {
                labels: [
                    'Depreciation',
                    'Insurance',
                    'Fuel',

                    'Maintenance',
                    'Loans/Rental',
                    'Other Costs(parking, tolls, washing, etc.)',


                ],
                datasets: [{
                    data: [
                        (parseFloat(this.state.depreciationValue) / (parseFloat(this.state.miles) * 52)),
                        ((parseFloat(this.state.iPaid)) / (parseFloat(this.state.miles) * 52)),
                        this.state.isElectric === "gas" ?
                            ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon)) / (parseFloat(this.state.miles) * 52)) :
                            ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost)) / (parseFloat(this.state.miles) * 52)),
                        (parseFloat(this.state.mait) / (parseFloat(this.state.miles) * 52)),
                        ((parseFloat(this.state.monthlyCarPay) * 12) / (parseFloat(this.state.miles) * 52)),
                        ((parseFloat(this.state.tolls) * 12) / (parseFloat(this.state.miles) * 52)),

                    ],
                    backgroundColor: [
                        'blue',
                        'green',
                        'yellow',
                        'red',
                        'purple',
                        'orange',
                        'lime',
                        'black'

                    ],
                    hoverBackgroundColor: [
                        'blue',
                        'green',
                        'yellow',
                        'red',
                        'purple',
                        'orange',
                        'lime',
                        'black'
                    ]
                }]
            };

            var labels = this.state.otherFamousCars.map((x) => x.Name);
            var CPMs = this.state.otherFamousCars.map((x) => x.CPM);



            var sortedLabels = this.state.otherFamousCars.slice().sort(compare2).map((x) => x.Name);
            var sortedCPMs = this.state.otherFamousCars.slice().sort(compare2).map((x) => x.CPM)
            renderRelationalData =
                (
                    <Container>
                        <Jumbotron>



                            <h2>Your Cost Per Mile is ${this.state.costpermile.toFixed(2)}</h2>
                            <h4>Throughout the entire year, this amounted to ${(this.state.costpermile * (this.state.miles * 52)).toFixed(2)}</h4>
                            <p>This is what is contributing to your Cost Per Mile every mile you drive</p>
                            <div className="DoughnutImage">
                                <Doughnut
                                    data={doughnutdata}
                                    width={20}
                                    height={20}
                                />
                            </div>
                            {/* <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="Table"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    [
                                        { type: 'string', label: 'Cost Per Mile Contributor' },
                                        { type: 'number', label: 'Cost Per Mile' },
                                        { type: 'number', label: 'Cost Through Year' },
                                    ],
                                    ['Total',  { v: this.state.costpermile.toFixed(2), f: '$' +this.state.costpermile.toFixed(2)  } , {v:(this.state.costpermile * (parseFloat(this.state.miles) * 52)).toFixed(2),f: "$" + (this.state.costpermile * (parseFloat(this.state.miles) * 52)).toFixed(2)}],
                                    ['Depreciation', { v: (parseFloat(this.state.depreciationValue) / (parseFloat((this.state.miles) * 52))).toFixed(2), f: '$' + (parseFloat(this.state.depreciationValue) / (parseFloat((this.state.miles) * 52))).toFixed(2) }, {v:(this.state.depreciationValue / 1).toFixed(2),f:"$" + (this.state.depreciationValue / 1).toFixed(2)}],
                                    ['Insurance', { v: (parseFloat(this.state.iPaid) / ((parseFloat(this.state.miles) * 52))).toFixed(2), f: '$' + (parseFloat(this.state.iPaid) / ((parseFloat(this.state.miles) * 52))).toFixed(2) },{v:(parseFloat(this.state.iPaid)).toFixed(2), f: "$" + (parseFloat(this.state.iPaid)).toFixed(2)} ],
                                    [this.state.isElectric === "electric" ? "Charging": "Gas", 
                                    this.state.isElectric === "electric" ? 
                                    { v: ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost)) / (parseFloat(this.state.miles) * 52)).toFixed(2), f: '$' + ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost)) / (parseFloat(this.state.miles) * 52)).toFixed(2) }
                                    : 
                                    {v:((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon)) / (parseFloat(this.state.miles) * 52)).toFixed(2),f: "$" + ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon)) / (parseFloat(this.state.miles) * 52)).toFixed(2)},

                                    this.state.isElectric === "electric" ? 
                                    {v:((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost))).toFixed(2),f:"$" + ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost))).toFixed(2)}
                                    :
                                    {v:((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon))).toFixed(2),f:"$" + ((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon))).toFixed(2)}
                                    
                                    ],
                                    ['Maintenance', { v: (parseFloat(this.state.mait) / (parseFloat(this.state.miles) * 52)).toFixed(2), f: '$' + (parseFloat(this.state.mait) / (parseFloat(this.state.miles) * 52)).toFixed(2) }, {v:(parseFloat(this.state.mait)).toFixed(2),f:"$" + (parseFloat(this.state.mait)).toFixed(2)}],
                                    ['Loans/Rental/Lease', { v: ((parseFloat(this.state.monthlyCarPay) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2), f: '$' + ((parseFloat(this.state.monthlyCarPay) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2) }, {v:((parseFloat(this.state.monthlyCarPay) * 12)).toFixed(2), f: "$" + ((parseFloat(this.state.monthlyCarPay) * 12)).toFixed(2)}],
                                    ['Other Costs', { v: ((parseFloat(this.state.tolls) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2), f: '$' + ((parseFloat(this.state.tolls) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2) }, {v:((parseFloat(this.state.tolls) * 12)).toFixed(2),f: "$" + ((parseFloat(this.state.tolls) * 12)).toFixed(2)}],
                                ]}
                                options={{
                                    showRowNumber: false,
                                    width: "100%",
                                    height: "100%",
                                    
                                }}
                            /> */}
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Cost Per Mile contributors</th>
                                        <th>Cost Per Mile</th>
                                        <th>Cost Through Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Total</th>
                                        <th>{"$" + this.state.costpermile.toFixed(2)} </th>
                                        <th>{"$" + (this.state.costpermile * (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                    </tr>
                                    <tr>
                                        <th>Depreciation</th>
                                        <th>${(parseFloat(this.state.depreciationValue) / (parseFloat((this.state.miles) * 52))).toFixed(2)}</th>
                                        <th>${(this.state.depreciationValue / 1).toFixed(2)}</th>
                                    </tr>
                                    <tr>
                                        <th>Insurance</th>
                                        <th>${(parseFloat(this.state.iPaid) / ((parseFloat(this.state.miles) * 52))).toFixed(2)}</th>
                                        <th>${(parseFloat(this.state.iPaid)).toFixed(2)}</th>
                                    </tr>
                                    {this.state.isElectric === "electric" ?
                                        <tr>
                                            <th>Charging (Electric)</th>
                                            <th>${((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost)) / (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                            <th>${((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.fullcharge)) * parseFloat(this.state.fullchargeCost))).toFixed(2)}</th>
                                        </tr>
                                        :
                                        <tr>
                                            <th>Gas</th>
                                            <th>${((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon)) / (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                            <th>${((((parseFloat(this.state.miles) * 52) / parseFloat(this.state.mpg)) * parseFloat(this.state.gallon))).toFixed(2)}</th>
                                        </tr>
                                    }
                                    <tr>
                                        <th>Maintenance</th>
                                        <th>${(parseFloat(this.state.mait) / (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                        <th>${(parseFloat(this.state.mait)).toFixed(2)}</th>
                                    </tr>

                                    <tr>
                                        <th>Loans/Rental/Lease</th>
                                        <th>${((parseFloat(this.state.monthlyCarPay) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                        <th>${((parseFloat(this.state.monthlyCarPay) * 12)).toFixed(2)}</th>
                                    </tr>
                                    <tr>
                                        <th>Other Costs</th>
                                        <th>${((parseFloat(this.state.tolls) * 12) / (parseFloat(this.state.miles) * 52)).toFixed(2)}</th>
                                        <th>${((parseFloat(this.state.tolls) * 12)).toFixed(2)}</th>
                                    </tr>
                                </tbody>
                            </Table>
                            <br />
                            <h2>Other Famous Cars</h2>
                            <p>This Bar Graph shows the Cost Per Mile of other famous cars and also types of cars.</p>
                            <Button
                                onClick={this.handleClickGraph}>{!this.state.graphRender ? "Sort Bar Data" : "Unsort Bar Data"}
                            </Button>
                            {this.state.width >= 900 ?
                                <div className="GraphImage">
                                    <Bar
                                        data={this.graphData}
                                    />

                                </div>
                                :
                                <Chart
                                    width={'300px'}
                                    height={'2000px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart</div>}
                                    data={!this.state.graphRender ? getBarData(labels, CPMs) : getBarData(sortedLabels, sortedCPMs)}
                                    options={{
                                        title: 'Cost Per Mile of Other Famous Cars',
                                        chartArea: { width: '50%' },

                                        vAxis: {
                                            title: 'Car Make And Model',
                                        },
                                        bar: { groupWidth: '70%' },
                                        legend: { position: 'none' },
                                        rx: 10,
                                        ry: 10,
                                    }}
                                    // For tests
                                    rootProps={{ 'data-testid': '2' }}
                                />
                            }



                            <h2>Comparison Table</h2>
                            <p>Choose 3 cars to compare data with below.</p>
                            <Form.Group>
                                <Form.Label>
                                    Enter first car
                                </Form.Label>
                                <Form.Control as="select"
                                    onChange={this.handleChange}
                                    id="seeOtherCPM"
                                    type="text"
                                    name="seeOtherCPM"
                                    value={this.state.seeOtherCPM}
                                >
                                    <option></option>
                                    {renderCarOptions}
                                </Form.Control>
                            </Form.Group>


                            {this.state.width > 800 &&
                                <Form.Group>
                                    <Form.Label>
                                        Enter second car
                                    </Form.Label>
                                    <Form.Control as="select"
                                        onChange={this.handleChange}
                                        id="seeOtherCPM"
                                        type="text"
                                        name="seeOtherCPM2"
                                        value={this.state.seeOtherCPM2}
                                    >
                                        <option></option>
                                        {renderCarOptions}
                                    </Form.Control>


                                </Form.Group>
                            }
                            {this.state.width > 800 &&
                                <Form.Group>
                                    <Form.Label>
                                        Enter third car
                                    </Form.Label>
                                    <Form.Control as="select"
                                        onChange={this.handleChange}
                                        id="seeOtherCPM3"
                                        type="text"
                                        name="seeOtherCPM3"
                                        value={this.state.seeOtherCPM3}
                                    >
                                        <option></option>
                                        {renderCarOptions}
                                    </Form.Control>
                                    <br />

                                </Form.Group>
                            }

                            {OtherCPM(this.state)}

                        </Jumbotron>


                    </Container>
                );
        }

        /**
         * Renders submission alert based on if costpermile is NaN or a real number
         */
        if (Number.isNaN(this.state.costpermile) && this.state.submitted) {
            renderAlert = (
                <Alert variant="danger">
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>You have some unaswered questions. To see your results, you must fill out all questions.</p>
                </Alert>
            );
        } else if (!(Number.isNaN(this.state.costpermile)) && this.state.submitted) {
            renderAlert =
                (
                    <Alert variant="success">
                        <Alert.Heading>Success!</Alert.Heading>
                        <p>scroll down to see results</p>
                    </Alert>
                )
        }

        else {
            renderAlert = (<div></div>)
        }
        /**
         * Renders Questions based on if user chose that they bought or rented the car
         */
        let renderBought;
        if (this.state.isRental === "bought") {
            renderBought = (
                <div>
                    <NewCost state={this.state} onChange={this.handleChange} />
                    <NowCost _state={this.state} _handleChange={this.handleChange} _handleClickCarFax={this.handleClickCarFax} />
                    <Form.Group>
                        <Form.Label>
                            c. What year did you buy this car?
                        </Form.Label>
                        <Form.Control
                            onChange={this.handleChange}
                            id="boughtCarYear"
                            name="boughtCarYear"
                            value={this.state.boughtCarYear}
                            required
                            as="select"
                        >
                            <option></option>
                            {carYears}
                        </Form.Control>
                    </Form.Group>
                    <Loan _state={this.state} _handleChange={this.handleChange} />

                </div>
            )
        } else if (this.state.isRental === "rental/lease") {
            renderBought = (
                <div>
                    <Rental _state={this.state} _handleChange={this.handleChange} />

                </div>
            )
        } else {
            renderBought = (<div></div>)
        }

        /**
         * returning of the entire page 
         * @see {file} "./components"
         */
        return (

            //RENDERING ALL QUESTION COMPONENTS

            <Container>

                <Header />
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Jumbotron>
                        <h2>Vehicle Information (Section 1/3)</h2>
                        {/**
                         * @see {file} ./ComponentsQuestion1.js
                         */}
                        <Question1 state={this.state} onChange={this.handleChange} carMakeAlert={renderCarMakeAlert} onClick={this.handleClickVIN} />

                        <Form.Label>
                            2. Enter you Car Year, Make, Model
                        </Form.Label>
                        <br />
                        {/**
                         * @see {file} ./ComponentsQuestion2.js
                         */}
                        <Question2 _state={this.state} _handleChange={this.handleChange} _handleChangeMake = {this.handleChangeMake} _carYears={carYears} _allOptions={allOptions} _allOptions2={allOptions2} _count={count} />
                        
                        {/**
                         * @see {file} ./ComponentsQuestion3.js
                         */}
                        <Question3 _state={this.state} _handleChange={this.handleChange} />
                        {renderFuelQuestions}

                    </Jumbotron>

                    <Jumbotron>
                        <h2>Ownership Costs (Section 2/3)</h2>
                        
                        {/**
                         * @see {file} ./ComponentsQuestion4.js
                         */}
                        <Question4 _state={this.state} _handleChange={this.handleChange} />
                        {renderBought}

                         
                        <Question5 _state={this.state} _handleChange={this.handleChange} />


                    </Jumbotron>

                    <Jumbotron>
                        <h2>Operating Costs (Section 3/3)</h2>

                        <Question6 _state={this.state} _handleChange={this.handleChange} />

                        <Question7 _state={this.state} _handleChange={this.handleChange} />

                        <Question8 _state={this.state} _handleChange={this.handleChange} />
                        {renderAlert}
                        <input type="submit"
                        />
                        <br />
                        {/* <Button onClick={this.handleClickSkip}>Skip form and see comparison</Button> */}

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