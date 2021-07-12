import Jumbotron from 'react-bootstrap/Jumbotron';

function Header() {
    return(
    <Jumbotron>
        <h1>
            9 Question Cost Per Mile Comparison
        </h1>
        <br/>
        <h4>
            What this Form does
        </h4>
        <p>
            The following questions are the basis for calculating your cost per mile. The information you provide is not stored in anyway. The results are for general information purporses only.
        </p>
        <h4>What is a cost per mile</h4>
        <p>
            Your cost per mile is a calculation that tells you how much it costs per mile. 
            Many people calculate only for the fuel cost per mile but there is many more hidden expenses that you may not know about.
        </p>
        <h4>Why is your cost per mile so important</h4>
        <p>
            Most people don't know what a cost per mile is, and therefore don't know what may be costing so much.
            Understanding your cost per mile is very important because you can see why it may be costing so much money to drive.
            Also, knowing what contributes to your cost per mile is very important as well.
            Detailed results are shown once you have successfully submitted the form.
        </p>

       
    </Jumbotron>
    )
}
export default Header;