import React, { Component } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../styles/Operations.css";
import { Snackbar, Alert, Button } from "@mui/material";

export class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: "",
      inputEmptyOpen: false,
      allowWithdrawOpen: false,
    };
  }

  deposit = () => {
    if (this.isInputsEmpty()) {
      this.handleValidationClick();
    } else {
      let transaction = this.makeTransaction();
      this.props.deposit(transaction);
      this.handleAddClick();
    }
  };

  isInputsEmpty = () => {
    let amount = this.state.amount;
    let vendor = this.state.vendor;
    let category = this.state.category;
    if (amount === "" || vendor === "" || category === "") {
      return true;
    }
    return false;
  };

  isAllowWithdraw = () => {
    return this.props.totalAmount() - this.state.amount > 500;
  };

  withdraw = () => {
    if (this.isInputsEmpty()) {
      this.handleValidationClick();
    } else {
      let transaction = this.makeTransaction();
      if (this.isAllowWithdraw()) {
        this.props.withdraw(transaction);
        this.handleAddClick();
      } else {
        this.handleAllowWithdraw();
      }
    }
  };

  handleAddClick = () => {
    this.props.handleClick();
  };

  handleValidationClick = () => {
    this.setState({ inputEmptyOpen: true });
  };

  handleAllowWithdraw = () => {
    this.setState({ allowWithdrawOpen: true });
  };

  handleCloseError = () => {
    this.setState({ inputEmptyOpen: false });
  };

  handleCloseAllowWidthdraw = () => {
    this.setState({ allowWithdrawOpen: false });
  };

  makeTransaction = () => {
    let transaction = {
      amount: this.state.amount,
      vendor: this.state.vendor,
      category: this.state.category,
    };
    return transaction;
  };

  handleInputs = (e) => {
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
          <h2>Create Transaction</h2>
          <input
            type="number"
            id="amount"
            value={this.state.amount}
            placeholder="Enter the amount"
            onChange={this.handleInputs}
          ></input>
          <input
            type="text"
            id="vendor"
            value={this.state.vendor}
            placeholder="Enter the vendor"
            onChange={this.handleInputs}
          ></input>
          <input
            type="text"
            id="category"
            value={this.state.category}
            placeholder="Enter the category"
            onChange={this.handleInputs}
          ></input>
          <div className="btns">
            <Link to={this.isInputsEmpty() ? "/operations" : "/transactions"}>
              <Button variant="contained" color="info" onClick={this.deposit}>
                Deposit
              </Button>
            </Link>
            <Link
              to={
                this.isInputsEmpty() || !this.isAllowWithdraw()
                  ? "/operations"
                  : "/transactions"
              }
            >
              <Button variant="contained" color="info" onClick={this.withdraw}>
                Withdraw
              </Button>
            </Link>
          </div>
        </form>
        <Snackbar
          open={this.state.inputEmptyOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseError}
        >
          <Alert
            onClose={this.handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            You should fill all fields!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.allowWithdrawOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseAllowWidthdraw}
        >
          <Alert
            onClose={this.handleCloseAllowWidthdraw}
            severity="error"
            sx={{ width: "100%" }}
          >
            Insufficient Funds
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Operations;
