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
  let transaction = req.body;
  let newTransaction = new Transaction(transaction);
  newTransaction.save();
  res.send(newTransaction);
});

router.delete("/transaction/:transactionId", function (req, res) {
  let transactionId = req.params.transactionId;
  Transaction.findByIdAndDelete(transactionId, function (err, transaction) {
    res.send(transaction);
  });
});

module.exports = router;
