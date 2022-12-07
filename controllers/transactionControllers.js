import { UserModel } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TransactionModel } from "../models/Transaction.js";
import moment from "moment";

// Modal Form Api / Add Transaction
export const addTransaction = catchAsyncError(async (req, res, next) => {
  // const { amount, type, date, reference, category, description } = req.body;
  // if (!amount || !type || !date || !reference || !category || !description) {
  //   return next(new ErrorHandler("Please enter required fields", 400));
  // }

  const newTransaction = new TransactionModel(req.body);

  await newTransaction.save();

  res.status(200).json({
    success: true,
    message: "Transaction Added successfully",
  });
});

// get All Transactions
export const getAllTransactions = catchAsyncError(async (req, res, next) => {
  const { frequency, selectedRange, type } = req.body;
  // Get only Logged in user transactions
  const transactions = await TransactionModel.find({
    ...(frequency !== "custom"
      ? {
          date: {
            $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
          },
        }
      : {
          date: {
            $gte: selectedRange[0],
            $lte: selectedRange[1],
          },
        }),
    userId: req.body.userId,
    ...(type !== "all" && { type }),
  }).sort({ date: -1 });

  res.send(transactions);

  // res.status(200).json({
  //   success: true,
  //   transactions,
  // });
});

// Edit Transaction
export const editTransaction = catchAsyncError(async (req, res, next) => {
  await TransactionModel.findOneAndUpdate(
    { _id: req.body.transactionId },
    req.body.payload,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Transaction Updated successfully",
  });
});

// Delete Transaction
export const deleteTransaction = catchAsyncError(async (req, res, next) => {
  await TransactionModel.findOneAndDelete({ _id: req.body.transactionId });

  res.status(200).json({
    success: true,
    message: "Transaction Updated successfully",
  });
});
