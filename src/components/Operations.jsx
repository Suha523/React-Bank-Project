import React, { Component } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../styles/Operations.css";

export class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: "",
    };
  }

  deposit = () => {
    let transaction = this.makeTransaction();
    this.props.deposit(transaction);
  };

  withdraw = () => {
    let transaction = this.makeTransaction();
    this.props.withdraw(transaction);
  };

  makeTransaction = () => {
    let transaction = {
      amount: this.state.amount,
      vendor: this.state.vendor,
      category: this.state.category,
    };
    return transaction;
  };

  changeState = (e) => {
    let target = e.target;
    let value = target.value;
    target.id === "amount"
      ? this.setState({ amount: parseInt(value) })
      : target.id === "vendor"
      ? this.setState({ vendor: value })
      : this.setState({ category: value });
  };

  render() {
    return (
      <div className="operations">
        <Title title="Operations" />
        <form className="form">
          <h2>Add New Transaction</h2>
          <input
            type="number"
            id="amount"
            value={this.state.amount}
            placeholder="Enter the amount"
            onChange={this.changeState}
          ></input>
          <input
            type="text"
            id="vendor"
            value={this.state.vendor}
            placeholder="Enter the vendor"
            onChange={this.changeState}
          ></input>
          <input
            type="text"
            id="category"
            value={this.state.category}
            placeholder="Enter the category"
            onChange={this.changeState}
          ></input>
          <div className="btns">
            <Link to="/transactions">
              <button onClick={this.deposit}>Deposit</button>
            </Link>
            <Link to="/transactions">
              <button onClick={this.withdraw}>Withdraw</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Operations;
