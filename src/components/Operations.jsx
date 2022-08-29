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
      open: false,
      allowWithdraw: false,
    };
  }

  deposit = () => {
    if (this.inputsValidation()) {
      this.handleValidationClick();
    } else {
      let transaction = this.makeTransaction();
      this.props.deposit(transaction);
      this.handleAddClick();
    }
  };

  inputsValidation = () => {
    let amount = this.state.amount;
    let vendor = this.state.vendor;
    let category = this.state.category;
    if (amount === "" || vendor === "" || category === "") {
      return true;
    }
    return false;
  };

  isAllowWithdraw = () => {
    return this.props.totalAmount() - this.state.amount < 500;
  };

  withdraw = () => {
    if (this.inputsValidation()) {
      this.handleValidationClick();
    } else {
      let transaction = this.makeTransaction();
      if (!this.isAllowWithdraw()) {
        this.props.withdraw(transaction);
        this.handleAddClick();
      } else {
        this.handleAllowBalance();
      }
    }
  };

  handleAddClick = () => {
    this.props.handleClick();
  };

  handleValidationClick = () => {
    this.setState({ open: true });
  };

  handleAllowBalance = () => {
    this.setState({ allowWithdraw: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAllowBalance = () => {
    this.setState({ allowWithdraw: false });
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
            <Link
              to={this.inputsValidation() ? "/operations" : "/transactions"}
            >
              <Button variant="outlined" onClick={this.deposit}>
                Deposit
              </Button>
            </Link>
            <Link
              to={
                this.inputsValidation() || this.isAllowWithdraw()
                  ? "/operations"
                  : "/transactions"
              }
            >
              <Button variant="outlined" onClick={this.withdraw}>
                Withdraw
              </Button>
            </Link>
          </div>
        </form>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            You should fill all fields!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.allowWithdraw}
          autoHideDuration={3000}
          onClose={this.handleCloseAllowBalance}
        >
          <Alert
            onClose={this.handleCloseAllowBalance}
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
