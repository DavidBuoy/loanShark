import { Jumbotron } from "reactstrap";
import "./style.css";
import logo from "../../img/loansharklogo.png";

function Jumbo() {
  return (
    <header className="App-header">
      <div>
        <Jumbotron>
          <div>
            <img
              className="logo"
              src={logo}
              alt={"This is the LoanShark Logo"}
            />
          </div>
          <p className="tagline">Take a bite out of Student Debt!</p>
        </Jumbotron>
      </div>
      <div className="padding-top-of-button">
        <a className="button" href="/register">
          Sign Up Now
        </a>
      </div>
    </header>
  );
}

export default Jumbo;
// jumbotron heading with style

// login button
