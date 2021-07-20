import Jumbotron from 'react-bootstrap/Jumbotron';

function Header() {
    return(
    <Jumbotron>
        <h1>
            9 Question Cost Per Mile Comparison
        </h1>
        <br/>
        
        <h4>What is cost per mile?</h4>
        <p>
            Your cost per mile is a calculation that tells you how much it costs to drive one mile.
            Many people only account for the fuel cost per mile, but there are many more expenses that you may not think about.
        </p>
        <h4>Why is your cost per mile so important?</h4>
        <p>
            Most people don't know their cost per mile and therefore don't know what may be costing
            so much to operate their car. Understanding your cost per mile allows you to begin lowering costs (e.g., finding a lower insurance provider).
        </p>
        <h4>
            What this form does
        </h4>
        <p>
            The following questions are the basis for calculating your cost per mile. The information you provide is not stored in any way. The results are for general information purposes only.
        </p>

       
    </Jumbotron>
    )
}
export default Header;