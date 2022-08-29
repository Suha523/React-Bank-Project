const express = require("express");
const router = express.Router();
const Transaction = require("../Models/Transaction");

router.get("/transactions", function (req, res) {
  Transaction.find({}, function (err, transactions) {
    try {
      res.send(transactions);
    } catch (err) {
      res.send(err);
    }
  });
});

router.post("/transaction", function (req, res) {
  try {
    let transaction = req.body;
    let newTransaction = new Transaction(transaction);
    newTransaction.save();
    res.send(newTransaction);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/transaction/:transactionId", function (req, res) {
  let transactionId = req.params.transactionId;
  try {
    Transaction.findByIdAndDelete(transactionId, function (err, transaction) {
      res.send(transaction);
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
