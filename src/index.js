import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costpermile: 0,
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
            gallon: "2.778",
            typeOfGas: "gasoline",
            priceOfGas: "",
            city: "",

            depreciationValue: "",
            fullcharge: "",
            fullchargeCost: "",
            zipcode: "",
            carMake: "",
            carModel: "",
            isElectric: "",
            carYear: "",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCarMake = this.handleCarMake.bind(this);


    }

    depreciate() {

        let depreciation = (this.state.originalPrice - this.state.finalPrice) / (2021 - this.state.carYear);
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
        this.getZIP(this.state.zipcode);
        console.log(this.state);
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

        if(this.state.mpg.length>0){
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
                ((parseInt(this.state.miles) / parseInt(this.state.fullcharge)) * this.state.fullChargeCost) +
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
    getZIP(zip) {
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


    getData(state) {
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
                    console.log(city[0][self.state.typeOfGas]);
                    self.setState({
                        gallon: city[0][self.state.typeOfGas]
                    })
                }

            });
        });

        req.end();


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
                            what is your model?
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

        if (this.state.isElectric.length === 0) {
            renderThis = (<div></div>);
        }
        else if (this.state.isElectric === "gas") {
            renderThis = (<div><Form.Group>
                <Form.Label>
                    What gas do you use?
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
                        placeholder="mpg"
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
                        placeholder="zip code"
                        onChange={this.handleChange}
                        id="zipcode"
                        type="number"
                        name="zipcode"
                        value={this.state.zipcode}
                    />
                </Form.Group>
                
                <br />
                <label>
                    {this.state.city.length > 0 ? "Your city, state is " + this.state.city + ", " + this.state.statecode : "Enter the question above and submit your zip code to move on"}
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
                                placeholder="miles driven"
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
                                placeholder="insurance per year"
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
                                placeholder="maitenance a year"
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
                                placeholder="tolls"
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
                                How much do you pay for other related car costs per year?
                            </Form.Label>
                            <Form.Control
                                placeholder="Other car costs"
                                onChange={this.handleChange}
                                id="subscriptions"
                                type="number"
                                name="subscriptions"
                                value={this.state.subscriptions}
                            />


                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                What is your car make
                            </Form.Label>
                            <Form.Control as="select"
                                placeholder="car make"
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
                                How much was this car when it was brand new?
                            </Form.Label>
                            <Form.Control
                                placeholder="original price"
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
                                placeholder="current price"
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

                    <h2>
                        Cost per mile: $ {this.state.costpermile.toFixed(2)}
                    </h2>
                    <p>
                        The average cost per mile is about $0.79 around the United States. The easiest way to improve your cost per mile is to drive more . The type of car that has the lowest average cost per mile is the small Sedan, and the type of car with the highest cost per mile is the pickup truck. The electric car has a good cost per mile; however, its depreciation costs exceed all other car types.
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
