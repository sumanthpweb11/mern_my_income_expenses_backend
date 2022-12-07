import express from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getAllTransactions,
} from "../controllers/transactionControllers.js";

const router = express.Router();

// Add Transaction Modal Form
router.route("/add-transaction").post(addTransaction);

// Get All Transactions
router.route("/get-all-transactions").post(getAllTransactions);

// Edit Transaction
router.route("/edit-transaction").post(editTransaction);

// Delete Transaction
router.route("/delete-transaction").post(deleteTransaction);

export default router;
