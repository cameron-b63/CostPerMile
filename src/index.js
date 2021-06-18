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
            statecode: "AL",
            mpg:"",
            subscriptions: "",
            gallon: "",
            api: "",
            typeOfGas: "gasoline",
            priceOfGas: "",
            city: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name]: value,
        });
        console.log(this.state);
        
        
        
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.getData(this.state.statecode);
        let final = ((parseInt(this.state.originalPrice) - parseInt(this.state.finalPrice)) + 
        parseInt(this.state.iPaid) + 
        (((this.state.miles * 52)/ this.state.mpg) * this.state.gallon) + 
        parseInt(this.state.mait) + 
        (parseInt(this.state.tolls) * 12) + 
        parseInt(this.state.subscriptions))
        /(parseInt(this.state.miles) * 52);

        this.setState(
            {costpermile: final
        })
    }
    getData(state){
       /* var http = require("https");

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
            
            console.log(self.state.typeOfGas);
            var city = bodyJSON.result.cities.filter((x) =>x.name.toLowerCase() === self.state.city.toLowerCase());
            if(city.length > 0){
                console.log(city[0][self.state.typeOfGas]);
                self.setState({
                    gallon: city[0][self.state.typeOfGas]
                })
            }
          });
        });
        
        req.end();
        
*/
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
                                        Enter the miles you usually driver per week
                                    </Form.Text>
                                </Form.Group>



                                <Form.Group> 
                                    
                                        <Form.Label>
                                            How much have you paid for insurance a year?
                                        </Form.Label>
                                                                  
                                   
                                        <Form.Control
                                        placeholder = "$insurance this year"
                                        onChange={this.handleChange}                                    
                                        id = "insurance"
                                        type = "number" 
                                        name = "iPaid"
                                        value = {this.state.iPaid}
                                        />
                                  
                                </Form.Group>
                               
                                

                                <Form.Group> 
                                    
                                        <Form.Label>
                                          How much have you paid for maitenance a year?
                                        </Form.Label>
                                                                  
                                    
                                    <Form.Control
                                        placeholder = "$maitenance this year"
                                        onChange={this.handleChange}                                    
                                        id = "maitenance"
                                        type = "number" 
                                        name = "mait"
                                        value = {this.state.mait}
                                    />
                              
                                </Form.Group>

                                <Form.Group> 
                                  
                                        <Form.Label>
                                            Original Price of car at beginning of year:
                                        </Form.Label>
                                                                 
                                  
                                    <Form.Control
                                        placeholder = "price of car"
                                        onChange={this.handleChange}                                    
                                        id = "oPrice"
                                        type = "number" 
                                        name = "originalPrice"
                                        value = {this.state.originalPrice}
                                    />
                               
                                </Form.Group>


                                <Form.Group> 
                                
                                        <Form.Label>
                                            Final price of car at end of year:
                                        </Form.Label>                
                                    <Form.Control
                                        placeholder = "final price of car"
                                        onChange={this.handleChange}                                    
                                        id = "fPrice"
                                        type = "number" 
                                        name = "finalPrice"
                                        value = {this.state.finalPrice}
                                    />
                                  
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
                                </Form.Group>



                                <Form.Group> 
                                  
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
                                            What gas do you use?
                                        </Form.Label>
                                                                
                                    
                                    <Form.Control as= "select"
                                     className = "mpg"
                                        
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
                                   
                                 </Form.Group>


                              <Form.Group>
                                        <Form.Label>
                                            What is your MPG?
                                        </Form.Label>
                                  
                                    <Form.Control
                                        placeholder = "mpg"
                                        onChange={this.handleChange}                                    
                                        id = "mpg"
                                        type = "number" 
                                        name = "mpg"
                                        value = {this.state.mpg}
                                    />
                            </Form.Group>

                                <Form.Group>
                                        <Form.Label>
                                            How much do you pay for subscriptions?
                                        </Form.Label>
                                    <Form.Control
                                        placeholder = "subscriptions"
                                        onChange={this.handleChange}                                    
                                        id = "subscriptions"
                                        type = "number" 
                                        name = "subscriptions"
                                        value = {this.state.subscriptions}
                                    />
                                    
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


                                <Button variant= "success">
                                    calculate!
                                </Button>
                            </Form>
                        
                    <br/>

                    <h2>
                        Cost per mile: $ { this.state.costpermile.toFixed(2) }
                    </h2>
                    <h2>
                        Current CPM: {parseInt(this.state.miles) !==0? ((parseInt(this.state.originalPrice) - parseInt(this.state.finalPrice)) + 
        parseInt(this.state.iPaid) + 
        (((this.state.miles * 52)/ this.state.mpg) * this.state.gallon) + 
        parseInt(this.state.mait) + 
        (parseInt(this.state.tolls) * 12) + 
        parseInt(this.state.subscriptions))
        /(parseInt(this.state.miles) * 52): "Error due to division by 0"}
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
