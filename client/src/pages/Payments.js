import React, { useEffect, useState } from "react";
import PaymentDetail from "../components/PaymentDetail";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link, useParams } from "react-router-dom";
import * as paymentAPIFunctions from "../utils/PaymentAPI";
import * as loanAPIFunctions from "../utils/LoanAPI";
import { Input, FormBtn } from "../components/Form";
import { useHistory } from "react-router-dom";
import "./style.css";
import { Col, Row } from "reactstrap";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Payments() {
  const history = useHistory();
  const [amountBorrowed, setAmountBorrowed] = useState(0);
  const [loanName, setLoanName] = useState();
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({});
  const [totalPaid, setTotalPaid] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [formObject, setFormObject] = useState({});
  const [userId, setuserId] = useState("");

  const { id } = useParams();
  const loanid = Object.values({ id }).toString(); // "lkajsdf;oijf"
  // var result;

  useEffect(() => {
    loadLoan(loanid);
    loadPayments(loanid);
    loadPayment();
  }, [amountBorrowed]);

  useEffect(() => {
    if (amountBorrowed <= totalPaid) {
      checkIfPaid();
    }
  }, [remainingBalance]);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(typeof userInfo);
    console.log(userInfo["0"].user_name);
    setuserId(userInfo["0"]._id);
  });

  // format date
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

  // get loan by id, setAmountBorrowed, and setLoanName
  function loadLoan(loanid) {
    loanAPIFunctions
      .getLoanById(loanid)
      .then((res) => {
        setAmountBorrowed(res.data.amount);
        setLoanName(res.data.name);
      })
      .catch((err) => console.log(err));
  }

  function checkIfPaid() {
    if (amountBorrowed !== 0 && remainingBalance <= 0) {
      var result = window.confirm("Success! Loan fully paid.");
      if (result) {
        loanAPIFunctions
          .deleteLoan(loanid)
          .then(() => {
            // redirect to profile page
            return history.push("/profile", { from: "Payments" });
          })
          .catch((err) => console.log(err));
      };
    };
  };

  // query payments by loanid
  function loadPayments(loanid) {
    paymentAPIFunctions
      .getPaymentsByLoanId(loanid)
      .then((res) => {
        // data array will only have the payments for this loan
        console.log(res);
        // initialize a paymentTotal, and resultsArray
        let paymentTotal = 0;
        let paymentResultsArray = res.data;
        // format date of every payment, and sum all payments
        paymentResultsArray.map(
          (result) => (result.date = formatDate(result.date))
        );
        paymentResultsArray.forEach((result) => {
          paymentTotal += result.balance;
        });
        // calculate difference between payment sum, and amount borrowed
        var result = amountBorrowed - paymentTotal;
        console.log(amountBorrowed, paymentTotal, result);
        // checkIfPaid(result);
        // setPayments lists payments from array, setTotalPaid is sum of all payments, setRemainingBalance with the difference btw amountBorrowed and sum of all payments
        setPayments(paymentResultsArray);
        setTotalPaid(paymentTotal);
        setRemainingBalance(result);
        if (!payment) {
          setPayment(payments[0]);
        };
      })
      .catch((err) => console.log(err));
  }

  function loadPayment() {
    if (!payment) {
      setPayment(payments[0]);
    };
  };

  // delete payment
  function deletePayment(id) {
    paymentAPIFunctions
      .deletePayment(id)
      .then(() => loadPayments(loanid))
      .catch((err) => console.log(err));
  }

  // expand clicked loan
  function handleClick(id) {
    console.log(id);
    paymentAPIFunctions
      .getPaymentById(id)
      .then((res) => {
        // variable, assign, set
        var result = formatDate(res.data.date);
        res.data.date = result;
        setPayment(res.data);
      })
      .catch((err) => console.log(err));
  }

  // updates component state when the user types in input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // each time submit payment is clicked, save payment, then check to see if the loan is paid
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formObject.balance);
    console.log(loanid);
    if (formObject.balance) {
      paymentAPIFunctions
        .savePayment({
          balance: formObject.balance,
          loan_id: loanid,
          user_id: userId,
        })
        .then(() => {
          loadPayments(loanid);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <Row>
        <Col md="3" xs="12">
          <div className="sidebar-payments">
            <h1 className="sb-payments-h1">Payments Made</h1>
            <p className="sb-payments-ptag">
              click to button below to view previous payments
            </p>
            <List>
              {payments.map((payment) => (
                <ListItem key={payment._id}>
                  <strong onClick={() => handleClick(payment._id)}>
                    {payment.balance} on {payment.date}
                  </strong>
                  <DeleteBtn onClick={() => deletePayment(payment._id)} />
                </ListItem>
              ))}
            </List>
          </div>
        </Col>
        <Col md="9" xs="12">
          <div>
            {payment ? (
              <PaymentDetail balance={payment.balance} date={payment.date}>
                {payment.balance}
              </PaymentDetail>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
          <p>
            Total {loanName} Loan Amount: ${amountBorrowed}
          </p>
          <p>All Payments Total: ${totalPaid}</p>
          <p>Remaining Balance: ${remainingBalance}</p>
          <div>
            <form>
              <Input
                onChange={handleInputChange}
                name="balance"
                placeholder="Payment Amount (required)"
              />
              <FormBtn
                disabled={!formObject.balance}
                onClick={handleFormSubmit}
              >
                Submit Payment
              </FormBtn>
            </form>
          </div>

          <Link to="/profile">← Back to Profile</Link>
          {/* commented out code below is what was here. */}
        </Col>
      </Row>
    </div>
  );
}

export default Payments;

