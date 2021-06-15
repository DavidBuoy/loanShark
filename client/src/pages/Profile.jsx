import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import * as loanAPIFunctions from "../utils/LoanAPI";
import * as paymentAPIFunctions from "../utils/PaymentAPI";

// Commponents Import
import V_ProgressWheel from "../components/V_ProgressWheel";
import logo from "../img/loansharklogo.png";
import { AuthProvider, SharkContext } from "../Context";

function Profile() {
  const [loans, setLoans] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const [count, setCount] = useState();
  const [loan, setLoan] = useState();
  const [totalDebt, setTotalDebt] = useState();
  const [formObject, setFormObject] = useState({});
  const [percentage, setPercentage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setuserId] = useState("");

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    setDisplayName(userInfo["0"].user_name);
    setuserId(userInfo["0"]._id);
  }, []);

  // only setPayments and setTotalDebt on page load for progress wheel, empty array keeps if quiet otherwise
  useEffect(() => {
    loadPayments();
    loadLoans();
  }, [userId]);

  // if loan & payment, calculate wheel- recalculates on loan delete and create- only on load
  useEffect(() => {
    if (totalPayments && totalDebt) {
      setPercentage(Math.floor((totalPayments / totalDebt) * 100));
    } else {
      setPercentage(0);
    }
  }, [totalPayments, totalDebt]);

  // loadLoan every time the loans change
  useEffect(() => {
    loadLoan();
  }, [loans]);

  function formatDate(dateString) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = dateString.substring(0, 10);
    const yearMonthDay = date.split("-");
    const year = yearMonthDay[0];
    const monthIndex = parseFloat(yearMonthDay[1]) - 1;
    const month = months[monthIndex];
    const day = yearMonthDay[2];
    return `${month} ${day}, ${year}`;
  }

  // load all users loans
  function loadPayments() {
    // get all payments from db
    paymentAPIFunctions
      .getAllPayments(userId)
      .then((res) => {
        console.log(res);
        // initialize a payment count, total, and array
        let count = 0;
        let paymentTotal = 0;
        let paymentResultsArray = res.data;
        // for each payment, increase count by 1, and add the payment to the total
        paymentResultsArray.forEach((result) => {
          paymentTotal += result.balance;
          count++;
        });
        // setPayments with total of all payments, setCount with a count of every payment
        setTotalPayments(paymentTotal);
        setCount(count);
      })
      .catch((err) => console.log(err));
  }

  // loan all users loans
  function loadLoans() {
    console.log("function loadLoans(userId) received: ", userId);
    // gets all loans from db
    loanAPIFunctions
      // getLoansByUserId
      .getLoans(userId)
      .then((res) => {
        // initialize a loan total, and array
        let loanTotal = 0;
        let loanResultsArray = res.data;
        // format each results date, and sum all loans
        loanResultsArray.map(
          (result) => (result.date = formatDate(result.date))
        );
        loanResultsArray.forEach((result) => {
          loanTotal += result.amount;
        });
        // setLoans lists all loans from the array, setTotalDebt with the sum of all loans
        setLoans(loanResultsArray);
        setTotalDebt(loanTotal);
      })
      .catch((err) => console.log(err));
  }

  function loadLoan() {
    if (loans) {
      setLoan(loans[0]);
    }
  }

  // delete loan
  function deleteLoan(id) {
    loanAPIFunctions
      .deleteLoan(id)
      .then(() => {
        loadLoans();
        loadPayments();
      })
      .catch((err) => console.log(err));
  }

  // get loan by id, format the date
  function handleClick(id) {
    loanAPIFunctions
      .getLoanById(id)
      .then((res) => {
        var result = formatDate(res.data.date);
        res.data.date = result;
        setLoan(res.data);
      })
      .catch((err) => console.log(err));
  }

  // updates component state when the user types in input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // when form is submitted, save loan amount and name, then reload loan list
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.name && formObject.amount) {
      loanAPIFunctions
        .saveLoan({
          name: formObject.name,
          amount: formObject.amount,
          user_id: userId,
        })
        .then(() => {
          loadLoans();
          loadPayments();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <Container className="themed-container" fluid={true}>
        <Row xs="12">
          <Col md="4" xs="12" className="sidebar">
            <div>
              <img className="logo-size" src={logo} alt="Logo" />
              <h5>{displayName}'s Current Loans</h5>
              <List>
                {loans.map((loan) => (
                  <ListItem key={loan._id}>
                    <strong onClick={() => handleClick(loan._id)}>
                      {loan.name} for {loan.amount}
                    </strong>
                    <DeleteBtn onClick={() => deleteLoan(loan._id)} />
                  </ListItem>
                ))}
              </List>

              <div className="graph-size d-flex justify-content-center">
                <V_ProgressWheel percent={percentage} />
              </div>
              <div>
                <form>
                  <h5>Add New Loan</h5>
                  <Input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Name of Loan (required)"
                  />
                  <Input
                    onChange={handleInputChange}
                    name="amount"
                    placeholder="Amount (required)"
                  />
                  <div className="sidebar-button">
                    <FormBtn
                      className="sidebar-button"
                      disabled={!(formObject.name && formObject.amount)}
                      onClick={handleFormSubmit}
                    >
                      Save Loan
                    </FormBtn>
                  </div>
                </form>
              </div>
            </div>
          </Col>

          <Col className="content" md="8" xs="12">
            <div>
              {loan ? (
                <div>
                  <h1>{loan.name}</h1>
                  <h3>Loan total = ${loan.amount}</h3>
                  <h4>{loan.date}</h4>
                  <Link to={"/payments/" + loan._id}>
                    <button className="payment-button">
                      View {loan.name} Payments
                    </button>
                  </Link>
                </div>
              ) : (
                <h3>No Results to Display</h3>
              )}

              <Row className="loan-stats-spacing">
                <h3>Loan Stats</h3>
                <Col xs="4">
                  <Card className="text-center p-3">
                    <p>Total Debt: {totalDebt}</p>
                    <p>Total Payments: {totalPayments}</p>
                    <hr className="hr" />
                    <h2>{count}</h2>
                  </Card>
                </Col>

                <Col xs="4">
                  <Card className="text-center p-3">
                    <p>Intrest Rate</p>
                    <hr className="hr" />
                    <h2>3.6%</h2>
                  </Card>
                </Col>

                <Col xs="4">
                  <Card className="text-center p-3">
                    <p>Lenght</p>
                    <hr className="hr" />
                    <h2>3 Years</h2>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
