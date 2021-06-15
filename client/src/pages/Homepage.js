// import React, { useState, useEffect } from "react";
import Jumbo from "../components/Jumbotron/index";
// import Introduction from "../components/Introduction/index";
import WhatIsLoanShark from "../components/WhatIsLoanShark/index";

function Homepage() {

  return (
    <div>
      <Jumbo>
        <h1>Your Loans Live Here.</h1>
      </Jumbo>
      <WhatIsLoanShark />
    </div>
  );
}

export default Homepage;
