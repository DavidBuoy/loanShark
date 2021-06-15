import React from "react";
import "./style.css";

function LoanDetail({ children, name, date, amount }) {
  return (
    <div>
      <h2>{name}</h2>
      <h3>Balance: ${amount}</h3>
      <h4>{date}</h4>
      <p>{children}</p>
    </div>
  );
}

export default LoanDetail;
