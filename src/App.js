import { Component } from "react";
import "./App.css";
import Operations from "./components/Operations";
import Transactions from "./components/Transactions";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Header from "./components/Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    };
  }

  totalAmount = () => {
    let transactions = this.state.transactions;
    let amounts = transactions.map((t) => t.amount);
    let totalAmount = 0;
    for (let amount of amounts) {
      totalAmount += amount;
    }
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
