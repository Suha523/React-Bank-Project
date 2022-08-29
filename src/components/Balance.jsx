import React, { Component } from "react";
import "../styles/Balance.css";

export class Balance extends Component {
  
  totalAmount = () => {
    return this.props.totalAmount();
  };

  render() {
    let balance = this.totalAmount();
    const MIN_BALANNCE = 500
    return (
      <div>
        The Balance: $
        {balance < MIN_BALANNCE ? (
          <span className="red">{balance}</span>
        ) : (
          <span className="green">{balance}</span>
        )}
      </div>
    );
  }
}

export default Balance;
