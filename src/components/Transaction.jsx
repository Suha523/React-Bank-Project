import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Transaction.css";

export class Transaction extends Component {
  deleteTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id);
  };

  returnTransaction = () => {
    let transaction = {
      index: this.props.index + 1,
      amount: this.props.transaction.amount,
      vendor: this.props.transaction.vendor,
      category: this.props.transaction.category,
    };

    return transaction;
  };

  render() {
    let transaction = this.returnTransaction();
    return (
      <tr className="transaction">
        <td>{transaction.index}</td>
        {transaction.amount < 0 ? (
          <td className="red">${transaction.amount}</td>
        ) : (
          <td className="green">${transaction.amount}</td>
        )}
        <td>{transaction.vendor}</td>
        <td>{transaction.category}</td>
        <td>
          <button onClick={this.deleteTransaction}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export default Transaction;
