import { Component } from "react";
import "./App.css";
import Operations from "./components/Operations";
import Transactions from "./components/Transactions";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Header from "./components/Header";
import { Snackbar, Alert } from "@mui/material";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      open: false,
    };
  }

  totalAmount = () => {
    let transactions = this.state.transactions;
    let amounts = transactions.map((t) => t.amount);
    let totalAmount = 0;
    totalAmount = amounts.reduce(
      (a, totalAmount) => (a += totalAmount),
      totalAmount
    );
    return totalAmount;
  };

  deposit = (transaction) => {
    this.addTransaction(transaction);
  };

  withdraw = (transaction) => {
    let amount = -1 * transaction.amount;
    transaction.amount = amount;
    this.addTransaction(transaction);
  };

  addTransaction = (transactionData) => {
    axios
      .post("http://localhost:4000/transaction", transactionData)
      .then((response) => {
        let transaction = response.data;
        this.setState({
          ...this.state,
          transactions: [...this.state.transactions, transaction],
        });
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  deleteTransaction = (transactionId) => {
    axios
      .delete(`http://localhost:4000/transaction/${transactionId}`)
      .then((response) => {
        let transaction = response.data;
        let transactions = [...this.state.transactions];
        let transactionIndex = transactions.findIndex(
          (t) => t._id === transaction._id
        );
        transactions.splice(transactionIndex, 1);
        this.setState({ ...this.state, transactions });
      });
  };

  getTransactions = () => {
    axios.get("http://localhost:4000/transactions").then((response) => {
      let transactions = response.data;
      this.setState({ transactions });
    });
  };

  componentDidMount() {
    this.getTransactions();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" render={() => <Header />}></Route>
            <Route
              exact
              path="/transactions"
              render={() => (
                <Transactions
                  transactions={this.state.transactions}
                  deleteTransaction={this.deleteTransaction}
                  getTransactions={this.getTransactions}
                  totalAmount={this.totalAmount}
                />
              )}
            ></Route>
            <Route
              exact
              path="/operations"
              render={() => (
                <Operations
                  transactions={this.state.transactions}
                  deposit={this.deposit}
                  withdraw={this.withdraw}
                  handleClick={this.handleClick}
                  totalAmount={this.totalAmount}
                />
              )}
            ></Route>
            <Route
              exact
              path="/categoreis"
              render={() => (
                <Categories transactions={this.state.transactions} />
              )}
            ></Route>
            <Snackbar
              open={this.state.open}
              autoHideDuration={3000}
              onClose={this.handleClose}
            >
              <Alert
                onClose={this.handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                The operation is done successfully!
              </Alert>
            </Snackbar>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
