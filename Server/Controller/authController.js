import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModels.js";
// import { transport } from "../config/nodemailer.js";
import { generatecode } from "../utils/urlshortnercode.js";
import Url  from "../Models/urlModel.js";

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201);

    const transport = nodema
    
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


export const createuserUrl = async(req,res) => {
    try {
      const { longUrl } = req.body;
      const existingUrl = await Url.findOne({longUrl});
      // console.log(existingUrl);
    if(existingUrl){
      return res.json({
        success:false,
        message:"you have already shortened your url",
        shortUrl: existingUrl.shortUrl,
        shortCode: existingUrl.shortCode
      })
    }

    const shortCode = generatecode();
    const shortUrl = `http://localhost:5173/${shortCode}`;

    const url = new Url({
      longUrl,
      shortUrl,
      shortCode,
    })

    await url.save();

    return res.status(201).json({
      success:true,
      id:url._id,
      message:"Your short url is created",
      shortCode,
      shortUrl
    })

    } catch (error) {
      return res.status(500).json({message:error.message})
    }
}




export const redirectUrl = async(req,res) => {
    const {shortCode} = req.params;
    // console.log(shortCode)
    const url = await Url.findOne({shortCode});
    console.log(url);
    res.json({
      longUrl:url.longUrl,
    })
}