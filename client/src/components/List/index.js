import React from 'react';

export function List({ children }) {
    return (
      <div className="list-overflow-container">
        <ul className="list-group">{children}</ul>
      </div>
    );
  }
  
  export function ListItem({ children }, props) {
    return <li className="list-group-item" {...props} role="button">{children}</li>;
  }

// loan blocks, each containing a loan total amount, name, remaining balance, small thumbnail chart and a 'view detail' button

// include a delete loan button here?