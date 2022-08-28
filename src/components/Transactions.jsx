import React, { Component } from "react";
import Transaction from "./Transaction";
import Balance from "./Balance";
import "../styles/Transactions.css";
import Title from "./Title";

export class Transactions extends Component {
  render() {
    let transactions = this.props.transactions;
    return (
      <div className="transactions">
        <Title title="Total Balance" />
        <div className="balance-container">
          <Balance totalAmount={this.props.totalAmount} />
        </div>

        <Title title="Transactions" />
        <div className="transaction-container">
          <table border="1">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, key) => (
                <Transaction
                  key={key}
                  index={key}
                  transaction={t}
                  deleteTransaction={this.props.deleteTransaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Transactions;
