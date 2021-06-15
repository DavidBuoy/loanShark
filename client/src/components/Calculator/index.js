import React from "react";

var principal = 0;
var interestRate = 0;
var timesCompounded = 0;
var termOfLoan = 0;
var amount = 0;


// JS functions 

function simpleInterest() {  
  // event.preventDefault();
  var principal = parseFloat(document.getElementById("principalSimple").value);
  var interestRate = parseFloat(document.getElementById("interestSimple").value);
  interestRate = interestRate / 100;
  var termOfLoan = parseFloat(document.getElementById("termSimple").value);
  var simpleInt = principal * interestRate * termOfLoan;
  var amount = (principal + simpleInt).toFixed(2);
  document.getElementById("siOutput-01").innerHTML = "Interest: $" + simpleInt.toFixed(2);
  document.getElementById("siOutput-02").innerHTML = "Total plus interest: $" + amount;
    
};

function compoundInterest() {
  // event.preventDefault();
  var principal = parseFloat(document.getElementById("principalCompound").value);
  var interestRate = parseFloat(document.getElementById("interestCompound").value);
  interestRate = interestRate / 100;
  var timesCompounded = parseFloat(document.getElementById("timesCompounded").value);
  var termOfLoan = parseFloat(document.getElementById("termCompound").value);
  var a = interestRate / timesCompounded;
  var b = 1 + a;
  var c = timesCompounded * termOfLoan;
  var d = Math.pow(b, c);
  var amount = (principal * d).toFixed(2);
  document.getElementById("ciOutput-01").innerHTML = "Interest: $" + (amount - principal).toFixed(2);
  document.getElementById("ciOutput-02").innerHTML = "Total plus interest: $" + amount;
};

simpleInterest();
compoundInterest();

// HTML need to refigure with some Reactstrap and plug functions into spots

<div class="jumbotron">
  <h1 class="text-center display-4">JavaScript Interest Calculator</h1>
  <hr>
  <div class="container" id="simple-interest">
    <h3>Simple Interest</h3>
    <p class="lead">A=i+(prt)</p>
    <form id="siForm">
      <div class="form-group">
        <label for="principalSimple">Principal</label>
        <input type="text" class="form-control" id="principalSimple" placeholder="Enter amount without dollar sign"></input>
      </div>
      <div class="form-group">
        <label for="interestSimple">Interest Rate</label>
        <input type="text" class="form-control" id="interestSimple" placeholder="Example: 12%"></input>
      </div>
      <div class="form-group">
        <label for="termSimple">Term of Loan</label>
        <input type="text" class="form-control" id="termSimple" placeholder="Example: 2 (must be in terms of years)"></input>
      </div>
      <button type="submit" class="btn btn-primary" id="btnSimple" onclick="simpleInterest()">Submit</button>
    </form>
    <div>
      <p class="lead mt-3" id="siOutput-01"></p>
      <p class="lead mb-3" id="siOutput-02"></p>
    </div>
    <div class="text-center">
      <input class="btn btn-secondary btn-lg" type="button" value="Reset" onClick="document.getElementById('siForm').reset()"></input>
    </div>
  </div>
  
  </hr>
  
  <div class="container" div="compound-interest ">
    <h3>Compound Interest</h3>
    <p class="lead">A=p(1+(r/n))^(nt)</p>
    <form id="ciForm">
      <div class="form-group">
        <label for="principalCompound">Principal</label>
        <input type="text" class="form-control" id="principalCompound" placeholder="Enter amount without dollar sign"></input>
      </div>
      <div class="form-group">
        <label for="interestCompound">Interest Rate</label>
        <input type="text" class="form-control" id="interestCompound" placeholder="Example: 12%"></input>
      </div>
      <div class="form-group">
        <label for="timesCompounded">Times Compounded per Year</label>
        <input type="text" class="form-control" id="timesCompounded" placeholder="Example: 4 (means compounded quarterly)"></input>
      </div>
      <div class="form-group">
        <label for="termCompound">Term of Loan</label>
        <input type="text" class="form-control" id="termCompound" placeholder="Example: 2 (must be in terms of years)"></input>
      </div>
      <button type="submit" class="btn btn-primary" id="btnCompound" onclick="compoundInterest()">Submit</button>
     
      
    </form>
    <div>
      <p class="lead mt-3" id="ciOutput-01"></p>
      <p class="lead mb-3" id="ciOutput-02"></p>
    </div>
    <div class="text-center">
      <input class="btn btn-secondary btn-lg" type="button" value="Reset" onClick="document.getElementById('ciForm').reset()"></input>
    </div>
  
</div>
</div>

// export default Calculator;

