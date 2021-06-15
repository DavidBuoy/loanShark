import React from "react";
import "./style.css";

function PaymentDetail({ balance, date }) {
  return (
    <div>
      <h3>This Payment: ${balance}</h3>
      <h4>Made on: {date}</h4>
    </div>
  );
}

export default PaymentDetail;