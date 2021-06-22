import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            costpermile:0,
            iPaid:"",
            gPaid:"",
            miles:"",
            mait:"",
            originalPrice:"",
            finalPrice:"",
            tolls: "",
            statecode: "",
            mpg:"",
            subscriptions: "",
            gallon: "",
            typeOfGas: "gasoline",
            priceOfGas: "",
            city: "",
            carType: "Small Sedan",
            depreciationValue: "",
            fullcharge: "",
            fullchargeCost: "",
            zipcode: "",
            isElectric: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCarMake = this.handleCarMake.bind(this);
        
    }
    /*
     <option name="carType">Small Sedan</option>
                                    <option name="carType">Medium Sedan</option>
                                    <option name="carType">Large Sedan</option>
                                    <option name="carType">Small SUV (FWD)</option>
                                    <option name="carType">Medium SUV (4WD)</option>
                                    <option name="carType">Minivan</option>
                                    <option name="carType">Hybrid Vehicle</option>
                                    <option name="carType">Electric Vehicle</option>
    */
    depreciate(cartype){
        let depreciation
        if(cartype === "Small Sedan"){
            depreciation = 2240 * (this.statemiles/15000)
        }
        else if(cartype ==="Medium Sedan"){
            depreciation = 3169 * (this.state.miles/15000)
        }
        else if(cartype ==="Large Sedan"){
            depreciation = 4061 * (this.state.miles/15000)
        }
        else if(cartype ==="Small SUV (FWD)"){
            depreciation = 3132 * (this.state.miles/15000)
        }
        else if(cartype ==="Medium SUV (4WD)"){
            depreciation = 3794 * (this.state.miles/15000)
        }
        else if(cartype ==="Minivan"){
            depreciation = 4036 * (this.state.miles/15000)
        }
        else if(cartype ==="Hybrid Vehicle"){
            depreciation = 3087 * (this.state.miles/15000)
        }
        else if(cartype ==="Electric Vehicle"){
            depreciation = 5250 * (this.state.miles/15000)
        }
        this.setState({
            depreciationValue: depreciation,
        })
    }
    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name]: value,
        });
        
        console.log(this.state);
    }
    handleClick(e){
        this.getZIP(this.state.zipcode);
        console.log(this.state);
    }
    handleCarMake(){
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/' + this.state.carMake + '?format=json')
			.then(response => response.json())
			.then(data => {
        this.setState({api: data["Results"] })
        
        console.log(this.state.api);
		})
		
    }
    handleSubmit(e) {
        e.preventDefault();
        this.depreciate(this.state.carType);
        //this.getZIP(this.state.zipcode);

        //wait
        
        this.getData(this.state.statecode);
        
        let final;
         
        if(this.state.mpg.length> 0){
            final = (parseInt(this.state.depreciationValue) + 
            parseInt(this.state.iPaid) + 
            (((this.state.miles * 52)/ this.state.mpg) * this.state.gallon) + 
            parseInt(this.state.mait) + 
            (parseInt(this.state.tolls) * 12) + 
            parseInt(this.state.subscriptions))
            /(parseInt(this.state.miles) * 52);
        }else{
            final = (parseInt(this.state.depreciationValue) + 
                parseInt(this.state.iPaid) + 
                ((parseInt(this.state.miles)/parseInt(this.state.fullcharge)) * this.state.fullChargeCost) + 
                parseInt(this.state.mait) + 
                (parseInt(this.state.tolls) * 12) + 
                parseInt(this.state.subscriptions))/
                (parseInt(this.state.miles) * 52);

        }

        this.setState(
            {costpermile: final
        })
    }
    getZIP(zip){
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
            });
        });

        req.end();
    }

    renderIsElectric() {
        if(this.state.isElectric.length===0){
            return <div></div>;
        }
        else if(this.state.isElectric === "gasoline"){
        return  <div><Form.Group> 
                    <Form.Label>
                        What gas do you use?
                    </Form.Label>
                                    
        
                    <Form.Control as= "select"
                    onChange={this.handleChange}                                    
                    id = "typeOfGas"
                    type = "text" 
                    name = "typeOfGas"
                    value = {this.state.typeOfGas}
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
                placeholder = "mpg"
                onChange={this.handleChange}                                    
                id = "mpg"
                type = "number" 
                name = "mpg"
                value = {this.state.mpg}
                />
                <Form.Text>
                    Do not answer this question if you are an electric vehicle user
                 </Form.Text>
            </Form.Group>
            </div>
        }else{
            <div>
                <Form.Group>
                            <Form.Label>
                                If you drive an electric vehicle, how far can you drive on a full charge in miles?
                            </Form.Label>
                                        
                        <Form.Control
                        placeholder = "fullcharge"
                        onChange={this.handleChange}                                    
                        id = "fullcharge"
                        type = "number" 
                        name = "fullcharge"
                        value = {this.state.fullcharge}
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
                    placeholder = "fullchargeCost"
                    onChange={this.handleChange}                                    
                    id = "fullchargeCost"
                    type = "number" 
                    name = "fullchargeCost"
                    value = {this.state.fullchargeCost}
                    />
                   <Form.Text>
                        Do not answer this question if you are a gas vehicle user
                    </Form.Text>
                </Form.Group>
            </div>
        }
    }

    getData(state){

        
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
            var city = bodyJSON.result.cities.filter((x) =>x.name.toLowerCase() === self.state.city.toLowerCase());
            if(city.length>0){
                console.log(city[0][self.state.typeOfGas]);
                self.setState({
                    gallon: city[0][self.state.typeOfGas]
                })
            }
            
          });
        });
        
        req.end();
        

    }
    render(){
       
        return(
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
             
                    
                    <Form onSubmit = {this.handleSubmit}>
                                <Form.Group>
                                    
                                    <Form.Label>
                                        How many miles do you usually drive per week?
                                    </Form.Label>

                                    <Form.Control type="number"
                                    placeholder = "miles driven"
                                    onChange={this.handleChange}
                                    id = "miles"
                                    type = "number" 
                                    name = "miles"
                                    value = {this.state.miles}  
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
                                        placeholder = "insurance per year"
                                        onChange={this.handleChange}                                    
                                        id = "insurance"
                                        type = "number" 
                                        name = "iPaid"
                                        value = {this.state.iPaid}
                                        />
                                <Form.Text className = "text-muted">
                                    Enter how much insurace you pay each year
                                </Form.Text>
                                </Form.Group>
                               
                                

                                <Form.Group> 
                                    
                                        <Form.Label>
                                          How much have you paid for maitenance a year?
                                        </Form.Label>
                                                                  
                                    
                                        <Form.Control
                                            placeholder = "maitenance a year"
                                            onChange={this.handleChange}                                    
                                            id = "maitenance"
                                            type = "number" 
                                            name = "mait"
                                            value = {this.state.mait}
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
                                        placeholder = "tolls"
                                        onChange={this.handleChange}                                    
                                        id = "tolls"
                                        type = "number" 
                                        name = "tolls"
                                        value = {this.state.tolls}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter how much you usually pay for tolls every month
                                    </Form.Text>
                                </Form.Group>



                        {   /*     <Form.Group> 
                                  
                                        <Form.Label>
                                            What is your state code?
                                        </Form.Label>
                                    
                                    <Form.Control as = "select"
                                        
                                        onChange={this.handleChange}                                    
                                        id = "statecode"
                                        type = "text" 
                                        name = "statecode"
                                        value = {this.state.statecode}
                                    >
                                        <option name = "statecode">AL</option>
                                        <option name = "statecode">AK</option>
                                        <option name = "statecode">AZ</option>
                                        <option name = "statecode">AR</option>
                                        <option name = "statecode">CA</option>
                                        <option name = "statecode">CO</option>
                                        <option name = "statecode">CT</option>
                                        <option name = "statecode">DE</option>
                                        <option name = "statecode">DC</option>
                                        <option name = "statecode">FL</option>
                                        <option name = "statecode">GA</option>
                                        <option name = "statecode">HI</option>
                                        <option name = "statecode">ID</option>
                                        <option name = "statecode">IN</option>
                                        <option name = "statecode">IA</option>
                                        <option name = "statecode">KS</option>
                                        <option name = "statecode">KY</option>
                                        <option name = "statecode">LA</option>
                                        <option name = "statecode">ME</option>
                                        <option name = "statecode">MD</option>
                                        <option name = "statecode">MA</option>
                                        <option name = "statecode">MI</option>
                                        <option name = "statecode">MN</option>
                                        <option name = "statecode">MS</option>
                                        <option name = "statecode">MO</option>
                                        <option name = "statecode">MT</option>
                                        <option name = "statecode">NE</option>
                                        <option name = "statecode">NV</option>
                                        <option name = "statecode">NH</option>
                                        <option name = "statecode">NJ</option>
                                        <option name = "statecode">NM</option>
                                        <option name = "statecode">NY</option>
                                        <option name = "statecode">NC</option>
                                        <option name = "statecode">ND</option>
                                        <option name = "statecode">OH</option>
                                        <option name = "statecode">OK</option>
                                        <option name = "statecode">OR</option>
                                        <option name = "statecode">PA</option>
                                        <option name = "statecode">RI</option>
                                        <option name = "statecode">SC</option>
                                        <option name = "statecode">SD</option>
                                        <option name = "statecode">TN</option>
                                        <option name = "statecode">TX</option>
                                        <option name = "statecode">UT</option>
                                        <option name = "statecode">VT</option>
                                        <option name = "statecode">VA</option>
                                        <option name = "statecode">WA</option>
                                        <option name = "statecode">WV</option>
                                        <option name = "statecode">WI</option>
                                        <option name = "statecode">WY</option>
                                    </Form.Control>
                                    
                                </Form.Group>

                                  <Form.Group> 
                                    
                                        <Form.Label>
                                            City you live in?
                                        </Form.Label>
                                                         
                              
                                    <Form.Control
                                        placeholder = "city"
                                        onChange={this.handleChange}                                    
                                        id = "city"
                                        type = "text" 
                                        name = "city"
                                        value = {this.state.city}
                                    />
                                    
                                </Form.Group>
   */ } 


                                <Form.Group> 
                                    
                                    <Form.Label>
                                        Are you an electric vehicle user or gas car user?
                                    </Form.Label>
                                                            
                                
                                <Form.Control as= "select"
                                    
                                    onChange={this.handleChange}                                    
                                    id = "isElectric"
                                    type = "text" 
                                    name = "isElectric"
                                    value = {this.state.isElectric}
                                >   
                                    <option name = "isElectric"></option>
                                    <option name="isElectric">gas</option>
                                    <option name="isElectric">electric</option>
                                    
                                </Form.Control>
                                


                                </Form.Group>

                    
                                <Button
                                onClick = {this.renderIsElectric}
                                >
                                    Submit if you are an electric user
                                </Button>

                            
                             
                            
                            <Form.Group>
                                        <Form.Label>
                                            What is your zip code?
                                        </Form.Label>
                                    
                                    <Form.Control
                                        placeholder = "zip code"
                                        onChange={this.handleChange}                                    
                                        id = "zipcode"
                                        type = "number" 
                                        name = "zipcode"
                                        value = {this.state.zipcode}
                                    />
                                   
                            </Form.Group>

                            <Button
                            variant = "primary"
                            onClick = {this.handleClick}
                            >
                                submit your zipcode!
                            </Button>
                            <br/>

                            
                            <label>
                                {this.state.city.length>0? "Your city, state is " + this.state.city + ", " + this.state.statecode :"Enter the question above and submit your zip code to move on"}
                            </label>
                           
                            <br/>
                            <br/>

                                <Form.Group>
                                        <Form.Label>
                                            How much do you pay for other related car costs per year?
                                        </Form.Label>
                                    <Form.Control
                                        placeholder = "Other car costs"
                                        onChange={this.handleChange}                                    
                                        id = "subscriptions"
                                        type = "number" 
                                        name = "subscriptions"
                                        value = {this.state.subscriptions}
                                    />
                                    
                            
                            </Form.Group>


                            <Form.Group> 
                                    
                                    <Form.Label>
                                        What type of car do you use
                                    </Form.Label>
                                                            
                                
                                <Form.Control as= "select"
                                    onChange={this.handleChange}                                    
                                    id = "carType"
                                    type = "text" 
                                    name = "carType"
                                    value = {this.state.carType}
                                >
                                     <option name="carType">Small Sedan</option>
                                    <option name="carType">Medium Sedan</option>
                                    <option name="carType">Large Sedan</option>
                                    <option name="carType">Small SUV (FWD)</option>
                                    <option name="carType">Medium SUV (4WD)</option>
                                    <option name="carType">Minivan</option>
                                    <option name="carType">Hybrid Vehicle</option>
                                    <option name="carType">Electric Vehicle</option>
                                </Form.Control>
                                <Form.Text>
                                    This calculates your depreciation value
                                </Form.Text>
                             </Form.Group>



                           {/*  <Form.Group> 
                                    
                                    <Form.Label>
                                        What is your car make
                                    </Form.Label>
                                                            
                                
                                <Form.Control
                                    onChange={this.handleChange}                                    
                                    id = "carMake"
                                    placeholder = "carMake"
                                    type = "text" 
                                    name = "carMake"
                                    value = {this.state.carMake}
                                />
                                     
                                <Form.Text>
                                    This calculates your depreciation value
                                </Form.Text>
                                <Button
                                type = "primary"
                                onClick = {this.handleCarMake}   
                                >
                                    Enter your car make
                                </Button>
                             </Form.Group>
                            <br/>
           
                            <br/>
                           */}
                               

                                


                                <input type = "submit" 
                                                                />
                            </Form>
                        
                    <br/>

                    <h2>
                        Cost per mile: $ { this.state.costpermile.toFixed(2) }
                    </h2>
                    
                </Jumbotron>
            </Container>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
  );
