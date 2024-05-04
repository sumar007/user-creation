import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";
import {
  sendVerificationEmail,
} from "../utils/sendMail.js";
import User from "../models/userModel.js";
//config env
dotenv.config();

//admin regitration
export const adminRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const verificationCode = crypto.randomBytes(3).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({
      name,
      email,
      password: hashPassword,
      verificationCode,
    });
    const savedAdmin = await admin.save();
    sendVerificationEmail(email, verificationCode);
    res.status(200).json({
      savedAdmin,
      message:
        "Registration successful. Please check your email for verification code",
    });
  } catch (err) {
    res.status(500).json("registration failed");
  }
};

// admin email verification
export const AdminVerifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    console.log(email, verificationCode);
    const user = await Admin.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ message: "Email verification successful" });
    } else {
      return res.status(401).json({ message: "Incorrect verification code" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// admin login

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await Admin.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "User not verified. Check your email for verification.",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // Create a JWT token with user payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("authToken", token, { expiresIn: 72 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//creating user
export const createUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      userId,
      password: hashPassword,
    });
    const savedUser = await user.save();
    res.status(200).json({ savedUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("users", users);
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//disable user
export const disableUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = false;
    const savedUser = await user.save();
    res.status(200).json({ savedUser, message: "User disabled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//enable user
export const enableUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = true;
    const savedUser = await user.save();
    res.status(200).json({ savedUser, message: "User enabled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.status) {
      return res
        .status(400)
        .json({ message: "User not verified. Contact admin." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // Create a JWT token with user payload
    const payload = {
      user: {
        id: user.id,
        userId: user.userId,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("authToken", token, { expiresIn: 72 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//forget password
export const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body; 

    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ message: "User ID and new password are required" });
    }

    // Find the user by ID
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save(); // Save the changes to the database

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
