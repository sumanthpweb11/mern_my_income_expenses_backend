import { UserModel } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const result = await UserModel.findOne({ email, password });
  if (!result) {
    return next(new ErrorHandler("Incorrect Email or Password", 401));
  }

  res.send(result);
});

//Register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await UserModel.findOne({ email });
  if (user) {
    return next(new ErrorHandler("user already exists", 409));
  }

  user = await UserModel.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: "user Registered successfully",
  });
});

// export const register = async (req, res) => {
//   try {
//     const newUser = new UserModel(req.body);

//     await newUser.save();
//     res.send("user registered successfully");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
