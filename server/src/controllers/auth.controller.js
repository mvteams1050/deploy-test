import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { register, login } from "../services/auth.service.js";

//Sign Up Admin

const signupAdmin = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const registerUser = await register(req.body);
    res.cookie("accessToken", registerUser.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json(registerUser);

    console.log("registerUser111111", registerUser);
    console.log("code", registerUser.token);
  } catch (error) {
    next(error);
  }
};

const signInAdmin = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const loginUser = await login(req.body);
    console.log();
    res.cookie("token", loginUser.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: loginUser,
    });
  } catch (error) {
    next(error);
  }
};

export { signupAdmin, signInAdmin };
