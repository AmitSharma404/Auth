import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModels.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Missing Fields",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const hashpassword = await bycrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashpassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);

    return res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      success:true,
      message:"User registered Successfully",
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.json({
          success: false,
          message: "Invalid Email",
        });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({
          success: false,
          message: "Password didn't match",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // console.log(token)

      return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login Successful",
      });
    } catch (error) {
        return res.json({
        success: false,
        message: error.message,
      });
    }
  }

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
